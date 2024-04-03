import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { ImgComponent } from '@components/img/img.component';

// * Interfaces.
import { IItems, ILibrary, data } from '@sell/interfaces/sell.interface';

// * Services.
import { LibrariesService } from '@libraries/services/libraries.service';
import { SellService } from '@sell/services/sell.service';
import { CoreService } from '@services/core.service';

// * Actions.
import { LIBRARY_LOAD } from '@libraries/state/libraries.actions';

// * Material.
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-library',
	standalone: true,
	imports: [MatExpansionModule, ButtonComponent, ImgComponent],
	templateUrl: './library.component.html',
	styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit, OnDestroy {
	public readonly sell: SellService = inject(SellService);
	public readonly core: CoreService = inject(CoreService);
	public readonly libraries: LibrariesService = inject(LibrariesService);

	public library?: ILibrary;

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store = inject(Store);

	public ngOnInit(): void {
		this._store.dispatch(LIBRARY_LOAD({ library: this.libraries.id('id') }));
		this.library = data;
	}

	public check(value: IItems[], index: number, multiple: number): void {
		value[index].check = value[index].check === 1 ? 0 : 1;
		if (multiple === 1) {
			value.forEach((item, i) => {
				if (i !== index) {
					item.check = 0;
				}
			});
		}
	}

	public redirect(id: number): void {
		console.log('Acá va la redirección a los distintos elementos, ¿Cuál es la ruta? Depende de la biblioteca => ', id);
	}

	public ngOnDestroy(): void {
		console.log(this.library);
	}
}
