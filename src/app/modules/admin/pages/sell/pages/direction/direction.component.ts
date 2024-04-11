import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { BehaviorSubject, Subject, filter, takeUntil } from 'rxjs';
import { environment } from '../../../../../../../environment/environment';

// * Cdks.
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';

// * Forms.
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

// * Validators.
import { getErrorMessage, notOnlySpaces } from '@validators/character.validators';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { CoreService } from '@services/core.service';

// * Interfaces.
interface IPrediction {
	description: string;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	place_id: string;
}

interface IMap {
	center: { lat: number; lng: number };
	zoom: number;
	options: google.maps.MapOptions;
}
// * Material.
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// * Maps.
import { HttpClient } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { IDirection, data } from './directions.interface';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-direction2',
	standalone: true,
	imports: [
		CdkTextareaAutosize,
		TextFieldModule,
		GoogleMapsModule,
		ReactiveFormsModule,
		MatAutocompleteModule,
		MatFormFieldModule,
		MatInputModule,
		ButtonComponent,
		AsyncPipe
	],
	templateUrl: './direction.component.html',
	styleUrl: './direction.component.scss'
})
export class DirectionComponent implements OnInit, OnDestroy {
	@ViewChild('autosize') public autosize?: CdkTextareaAutosize;
	@ViewChild(MatAutocompleteTrigger) public trigger?: MatAutocompleteTrigger;
	@ViewChild('input') public input?: ElementRef<HTMLInputElement>;
	// * Mock de datos * //
	public data?: IDirection;

	// * Formulario * //
	public form: UntypedFormGroup = new UntypedFormGroup({
		address: new UntypedFormControl(this.data?.address, notOnlySpaces()),
		postalCode: new UntypedFormControl(this.data?.postalCode, notOnlySpaces()),
		country: new UntypedFormControl(this.data?.country, notOnlySpaces()),
		state: new UntypedFormControl(this.data?.state, notOnlySpaces()),
		city: new UntypedFormControl(this.data?.city, notOnlySpaces()),
		street: new UntypedFormControl(this.data?.street, notOnlySpaces()),
		streetNumber: new UntypedFormControl(this.data?.streetNumber, notOnlySpaces()),
		ref: new UntypedFormControl(this.data?.ref, notOnlySpaces()),
		note: new UntypedFormControl(this.data?.note, notOnlySpaces())
	});

	public readonly getErrorMessage = getErrorMessage;

	public regex: RegExp = /\b\d{2,}\b/g;

	// * Configuracion del mapa * //
	public config: IMap = {
		center: { lat: 18.735693, lng: -70.162651 },
		zoom: 17,
		options: {
			mapId: environment.map,
			disableDefaultUI: true,
			clickableIcons: true
		}
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public addressResults: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public countryResults: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public stateResults: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public cityResults: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public streetResults: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public streetNumberResults: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	// public autocompleteResults: Signal<IPrediction[]> = signal([]);

	public currentPosition?: GeolocationPosition;

	public marker: google.maps.LatLngLiteral = {
		lat: 0,
		lng: 0
	};

	// Variable para almacenar el nombre corto del pais, para poder hacer las busquedas por ciudad del pais ingresado.
	public shortCountry: string = '';
	public readonly core: CoreService = inject(CoreService);

	private readonly _http: HttpClient = inject(HttpClient);

	private readonly _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

	private readonly _destroy$: Subject<void> = new Subject<void>();

	public ngOnInit(): void {
		this.data = JSON.parse(JSON.stringify(data));
		this.changeInput();
	}

	// Te ubica en la posicion actual que te encuentras.
	public position(): void {
		navigator.geolocation.getCurrentPosition((position) => {
			const currentPosition = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			this.config.center = currentPosition;
			this.currentPosition = position;
			this._marker(currentPosition);
			this.setAddress(currentPosition);
			this._cdr.markForCheck();
		});
	}

	// * Verificar si hay cambios * //
	public checkForChanges(): boolean {
		return JSON.stringify(this.form.value) !== JSON.stringify(this.data);
	}

	// * Metodo que se ejecuta al seleccion una opcion del autocompletado, te ubica en el mapa * //
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	public selectPlace(prediction: any): void {
		const geocoder = new google.maps.Geocoder();
		void geocoder.geocode({ placeId: prediction.place_id }, (results, status) => {
			if (status === google.maps.GeocoderStatus.OK && results) {
				this.config.center = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };
				this._marker({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() });
			}
		});
	}

	public search(query: string): void {
		if (!query.trim()) {
			this.addressResults.next([]);
			return;
		}
		let current: google.maps.LatLngLiteral | undefined = undefined;
		if (this.currentPosition) {
			current = {
				lat: this.currentPosition.coords.latitude,
				lng: this.currentPosition.coords.longitude
			};
		}
		let request: google.maps.places.AutocompletionRequest = { input: query };
		if (current) {
			request = {
				input: query,
				locationBias: {
					north: current.lat + 0.1,
					south: current.lat - 0.1,
					east: current.lng + 0.1,
					west: current.lng - 0.1
				}
			};
		}
		this._request(request, this.addressResults);
	}

	// Busca paises
	public searchCountries(query: string): void {
		const request: google.maps.places.AutocompletionRequest = {
			input: query,
			types: ['(regions)']
		};

		this._request(request, this.countryResults);
	}

	// Búsqueda provincias dentro de un país
	public searchStateByCountry(query: string): void {
		if (!this.form.get('country')?.value) return;

		const request = {
			input: query,
			componentRestrictions: {
				country: this.shortCountry
			},
			types: ['administrative_area_level_1']
		};

		this._request(request, this.stateResults);
	}

	// Búsqueda de ciudades dentro de una provincia
	public searchCityByState(query: string): void {
		if (!this.form.get('state')?.value) return;

		const request = {
			input: 'Provincia de ' + this.form.get('state')?.value + ', ' + query,
			componentRestrictions: {
				country: this.shortCountry
			},
			types: ['locality']
		};

		this._request(request, this.cityResults);
	}

	// Búsqueda de calles dentro de una ciudad
	public searchStreetByCity(query: string): void {
		if (!this.form.get('city')?.value || !query) return;

		const request: google.maps.places.AutocompletionRequest = {
			input: 'Provincia de ' + this.form.get('state')?.value + ', ' + this.form.get('city')?.value + ', ' + query,
			types: ['address']
		};

		this._request(request, this.streetResults);
	}

	// Búsqueda por numero de calle
	public searchStreetNumber(query: string): void {
		if (!this.form.get('street')?.value) return;

		const request = {
			input: this.form.get('city')?.value + ',' + this.form.get('state')?.value + ', ' + this.form.get('street')?.value + ' ' + query,
			componentRestrictions: {
				country: this.shortCountry
			},
			types: ['address']
		};

		this._request(request, this.streetNumberResults);
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	public selectFirst(data: any): void {
		data
			.pipe(
				takeUntil(this._destroy$),
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				filter((predictions: any) => predictions.length > 0)
			)
			.subscribe((predictions: IPrediction[]) => {
				this.selectPlace(predictions[0]);
				if (this.trigger) this.trigger.closePanel();
				this.form.get('address')?.setValue(predictions[0].description);
			});
	}

	public addMarker(event: google.maps.MapMouseEvent): void {
		if (event.latLng) {
			this.setAddress(event.latLng);
			this.marker = event.latLng.toJSON();
		}
	}

	public setAddress(cords: google.maps.LatLng | { lat: number; lng: number }): void {
		const geocoder = new google.maps.Geocoder();
		void geocoder.geocode({ location: cords }, (results, status) => {
			if (status === 'OK') {
				if (results) {
					const streetName = results[0].address_components.find((component) => component.types.includes('route'))?.short_name ?? '';
					const streetNumber =
						results[0].address_components.find((component) => component.types.includes('street_number'))?.short_name ?? '';
					const city = results[0].address_components.find((component) => component.types.includes('locality'))?.short_name ?? '';
					const province =
						results[0].address_components.find((component) => component.types.includes('administrative_area_level_1'))?.short_name ?? '';
					const postalCode = results[0].address_components.find((component) => component.types.includes('postal_code'))?.short_name ?? '';
					const country = results[0].address_components.find((component) => component.types.includes('country'))?.long_name ?? '';

					this.shortCountry = results[0].address_components.find((component) => component.types.includes('country'))?.short_name ?? '';

					let address = '';

					address += streetName || streetNumber ? streetName + (streetNumber ? ' ' + streetNumber : '') : '';
					address += city ? (address ? ', ' + city : city) : '';
					address += province ? ', ' + province : '';

					console.log(postalCode);
					console.log(province);
					console.log(city);

					this.form.get('address')?.setValue(address);
					this.form.get('postalCode')?.setValue(postalCode);
					this.form.get('country')?.setValue(country);
					this.form.get('state')?.setValue(province);
					this.form.get('city')?.setValue(city);
					this.form.get('street')?.setValue(streetName);
					this.form.get('streetNumber')?.setValue(streetNumber);
				}
			}
		});
	}

	public changeInput(): void {
		this._reset('postalCode', ['country', 'state', 'city', 'street', 'streetNumber']);
		this._reset('country', ['state', 'city', 'street', 'streetNumber']);
		this._reset('state', ['city', 'street', 'streetNumber']);
		this._reset('city', ['street', 'streetNumber']);
		this._reset('street', ['streetNumber']);
	}

	public save(): void {
		this.data = this.form.value;
	}

	public ngOnDestroy(): void {
		this.addressResults.unsubscribe();
		this.countryResults.unsubscribe();
		this.stateResults.unsubscribe();
		this.cityResults.unsubscribe();
		this.streetResults.unsubscribe();
		this.streetNumberResults.unsubscribe();
		this._destroy$.next();
		this._destroy$.complete();
	}

	private _reset(triggerField: string, dependentFields: string[]): void {
		this.form.get(triggerField)?.valueChanges.subscribe((value) => {
			if (!value) {
				dependentFields.forEach((field) => this.form.get(field)?.reset(null));
			}
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
	private _request(request: google.maps.places.AutocompletionRequest, data: any): void {
		const autocompleteService = new google.maps.places.AutocompleteService();
		void autocompleteService.getPlacePredictions(request, (predictions, status) => {
			if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
				data.next(predictions);
				console.log(predictions);
			} else {
				// console.error('Error', status);
				data.next([]);
			}
		});
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	private _marker(cords: any): void {
		this.marker = cords;
		this._cdr.markForCheck();
	}
}
