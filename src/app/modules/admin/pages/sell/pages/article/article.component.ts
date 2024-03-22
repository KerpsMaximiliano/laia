import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	NgZone,
	OnDestroy,
	OnInit,
	Signal,
	ViewChild,
	inject
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';

// * CDK.
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';

// * Forms.
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Consts.
import { CHANGE, UPDATING } from '@app/core/constants/load.const';

// * Functions.
import { id } from '@functions/id.function';

// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';
import { IState } from '@interfaces/state.interface';
import { IArticle } from '@sell/interfaces/sell.interface';
import { ILogin } from '@user/interfaces/user.interface';

// * Pipes.
import { currency } from '@pipes/currency.pipe';

// * Services.
import { SellService } from '@sell/services/sell.service';
import { CoreService } from '@services/core.service';

// * Sorts.
import { ILoading } from '@app/core/sorts/loading.sort';

// * Actions.
import { ADMIN_SELL_ARTICLE_CREATE } from '@sell/state/sell.actions';

// * Validators.
import { getErrorMessage, notOnlySpaces } from '@validators/character.validators';

// * Selectors.
import { selectAdminSellArticle } from '@sell/state/sell.selectors';
import { selectLogin } from '@user/state/user.selectors';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-article',
	standalone: true,
	imports: [DragDropModule, TextFieldModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ButtonComponent],
	templateUrl: './article.component.html',
	styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('input') public readonly input?: ElementRef<HTMLInputElement>;
	@ViewChild('autosize') public readonly autosize?: CdkTextareaAutosize;
	@ViewChild('medias') public readonly medias?: ElementRef<HTMLInputElement>;

	public readonly change: ILoading = CHANGE;
	public readonly updating: ILoading = UPDATING;
	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly currency: (value: number | null | undefined) => string = currency;
	public readonly core: CoreService = inject(CoreService);
	public readonly sell: SellService = inject(SellService);
	public readonly form: UntypedFormGroup = this._setForm();

	public article?: Signal<ILoadableEntity<IArticle>>;
	public readonly resources = Array.from({ length: 9 }, (_, i) => i);
	public edition: number = -1; // -1: none; 0: drag; 1: delete;
	public changes: boolean = false;
	public images: string[] = [];
	public options: {
		title: string;
		description: string;
	}[] = [
		{
			title: 'Categorias',
			description: 'Agrupa y presenta artículos en tu tienda.'
		},
		{
			title: 'Incentivos',
			description: 'Incentiva a tu personal interno a vender para que vendas más de cualquiera de tus artículos.'
		},
		{
			title: 'Catálogos',
			description: 'Creálos con precios ajustables como playlists para aumentar tu alcance y visibilidad a cambio de comisiones.'
		},
		{
			title: 'Premia a compradores',
			description: 'Asigna la cantidad de puntos que se ganan los compradores y premiálos cuando alcancen tu meta.'
		},
		{
			title: 'Reservas',
			description:
				'Destina un tiempo específico para brindar el servicio de este Artículo. Conecta su propio Google Calendar para la gestión.'
		}
	];

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);
	private readonly _zone: NgZone = inject(NgZone);
	private readonly _route: ActivatedRoute = inject(ActivatedRoute);
	private readonly _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
	private readonly _id: (id: string | undefined) => number = id;
	private readonly _destroy$: Subject<void> = new Subject<void>();

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly user: Signal<ILogin> = this._store.selectSignal(selectLogin);

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	private _blobs: any[] = [];

	public ngOnInit(): void {
		if (this._id(this._route.snapshot.params['id']) === 0) return;
		if (this._id(this._route.snapshot.params['id']) > 0) {
			console.log('read', this._id(this._route.snapshot.params['id']));
		}

		// switch () {
		// 	case -1: // CREATE.
		// 		console.log('create');
		// 		break;
		// 	case 0: // ERROR.
		// 		console.log('error => ARTICULO NO ENCONTRADO');
		// 		return;
		// 	default: // READ | UPDATE.
		// 		console.log('read => LOAD ARTICLE | LOAD ARTICLE DETAIL | ARTICULO NO ENCONTRADO');
		// 		break;
		// }

		this.article = this._store.selectSignal(selectAdminSellArticle(this._id(this._route.snapshot.params['id'])));

		this.form.get('title')?.setValue(this.article().data.title);
		this.form.get('price')?.setValue(this.article().data.price.amount);
		this.form.get('stock')?.setValue(this.article().data.stock.quantity);
		this.form.get('tStock')?.setValue(this.article().data.stock.type);
	}

	public ngAfterViewInit(): void {
		if (this.input) this.input.nativeElement.focus();
		this._resize();
	}

	public onClickInput(): void {
		// if (this.request) return;
		if (this.medias) this.medias.nativeElement.click();
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	public onFileSelected(event: any): void {
		const input = event.target;

		if (input.files && input.files.length > 0) {
			const files: File[] = input.files;

			let fail: { status: boolean; num: number[] } = { status: false, num: [] };

			if (this.images.length === 0) {
				const length = files.length > 9 ? 9 : files.length;
				for (let i = 0; i < length; i++) {
					if (!files[i].type.match('image.*')) {
						fail = { status: true, num: [...fail.num, i] };
					} else {
						this.images.push(URL.createObjectURL(files[i]));
						this._blobs.push(files[i]);
					}
				}
			} else {
				const max: number = 9 - this.images.length;
				if (files.length > max) {
					for (let i = 0; i < max; i++) {
						if (!files[i].type.match('image.*')) {
							fail = { status: true, num: [...fail.num, i] };
						} else {
							this.images.push(URL.createObjectURL(files[i]));
							this._blobs.push(files[i]);
						}
					}
				} else {
					for (let i = 0; i < files.length; i++) {
						if (!files[i].type.match('image.*')) {
							fail = { status: true, num: [...fail.num, i] };
						} else {
							this.images.push(URL.createObjectURL(files[i]));
							this._blobs.push(files[i]);
						}
					}
				}
			}

			if (fail.status) {
				// ! Mensaje de error sin configurar.
				alert('Por favor selecciona una imagen.');
			}
		}
	}

	public drop(event: CdkDragDrop<{ item: string; index: number }>): void {
		moveItemInArray(this.images, event.previousContainer.data.index, event.container.data.index);
	}

	public save(): void {
		if (this.form.valid) {
			if (this.article) {
				const data: IArticle = this.article().data;
				// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
				let medias: any[] = [];
				if (data.medias && data.medias.length > 0) medias = data.medias.map((media) => media.url);
				this._store.dispatch(
					ADMIN_SELL_ARTICLE_CREATE({
						medias,
						title: this.form.get('title')?.value,
						price: this.form.get('price')?.value,
						tPrice: data.price.type,
						stock: this.form.get('stock')?.value,
						tStock: this.form.get('tStock')?.value,
						manufacturing: data.manufacturing.time,
						tManufacturing: data.manufacturing.type,
						hashtag: data.hashtag,
						keywords: data.keywords.items,
						segmentMedia: data.segments.items[0].media,
						segmentTitle: data.segments.items[0].title,
						segmentDescription: data.segments.items[0].description,
						question: data.questions.items[0].question,
						questionType: data.questions.items[0].type,
						questionRequired: data.questions.items[0].required,
						questionLimit: data.questions.items[0].limit,
						questionOptions: data.questions.items[0].options
					})
				);
				console.log('save', medias, data);
			} else {
				console.log('no save');
			}
		} else {
			this.form.markAllAsTouched();
		}
	}

	public ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			title: new UntypedFormControl(null, [Validators.maxLength(120), notOnlySpaces()]),
			price: new UntypedFormControl(null, Validators.max(9999999999)),
			stock: new UntypedFormControl(null, Validators.max(9999999999)),
			tStock: new UntypedFormControl(1)
		});
	}

	private _resize(): void {
		this.form.controls['title'].valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
			this._zone.onStable.pipe(take(1)).subscribe(() => this.autosize?.resizeToFitContent(true));
		});
	}
}
