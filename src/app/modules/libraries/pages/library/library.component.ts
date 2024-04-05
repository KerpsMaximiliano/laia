import { ChangeDetectionStrategy, Component, OnInit, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { ImgComponent } from '@components/img/img.component';

// * Interfaces.
import { IItems } from '@sell/interfaces/sell.interface';

// * Services.
import { LibrariesService } from '@libraries/services/libraries.service';
import { SellService } from '@sell/services/sell.service';
import { CoreService } from '@services/core.service';

// * Actions.
import { LIBRARY_LOAD, LIBRARY_SELECT_ELEMENT } from '@libraries/state/libraries.actions';

// * Material.
import { MatExpansionModule } from '@angular/material/expansion';
import { LoadingComponent } from '../../../../core/components/loading/loading.component';
import { COMPLETE } from '../../../../core/constants/load.const';
import { IState } from '../../../../core/interfaces/state.interface';
import { ILoading } from '../../../../core/sorts/loading.sort';
import { ILibraries } from '../../interfaces/libraries.interface';
import { selectLibrary } from '../../state/libraries.selectors';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-library',
	standalone: true,
	imports: [MatExpansionModule, ButtonComponent, ImgComponent, LoadingComponent],
	templateUrl: './library.component.html',
	styleUrl: './library.component.scss'
})
export class LibraryComponent<K extends keyof ILibraries> implements OnInit {
	public readonly sell: SellService = inject(SellService);
	public readonly core: CoreService = inject(CoreService);
	public readonly libraries: LibrariesService = inject(LibrariesService);
	public readonly complete: ILoading = COMPLETE;

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly library: Signal<ILibraries[K]> = this._store.selectSignal(selectLibrary(this._library()));

	public ngOnInit(): void {
		const library = this.libraries.id('library');
		if (library > 0) this._store.dispatch(LIBRARY_LOAD({ library }));
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
		this.core.redirect(`admin/sell/library/${this.library().id}/collection/${id}`);
	}

	public select(id: number | null): void {
		const library: K = this._library();
		if (id && id !== this.library().selected) this._store.dispatch(LIBRARY_SELECT_ELEMENT({ id, library }));
	}

	private _library(): K {
		const library = this.libraries.id('library');

		switch (library) {
			case 1:
				return 'buyers' as K;
			default:
				return 'buyers' as K;
		}
	}
}
