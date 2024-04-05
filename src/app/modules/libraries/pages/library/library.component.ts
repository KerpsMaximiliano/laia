import { ChangeDetectionStrategy, Component, OnInit, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { ImgComponent } from '@components/img/img.component';
import { LoadingComponent } from '@components/loading/loading.component';

// * Conts.
import { COMPLETE, LOADING } from '@consts/load.const';

// * Interfaces.
import { IState } from '@interfaces/state.interface';
import { ILibrary } from '@libraries/interfaces/libraries.interface';

// * Sorts.
import { ILoading } from '@sorts/loading.sort';

// * Services.
import { LibrariesService } from '@libraries/services/libraries.service';
import { SellService } from '@sell/services/sell.service';
import { CoreService } from '@services/core.service';

// * Actions.

// * Selectors.
import { selectLibrary } from '@libraries/state/libraries.selectors';

// * Material.
import { MatExpansionModule } from '@angular/material/expansion';
import { LIBRARY_LOAD } from '../../state/libraries.actions';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-library',
	standalone: true,
	imports: [MatExpansionModule, ButtonComponent, ImgComponent, LoadingComponent],
	templateUrl: './library.component.html',
	styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit {
	public readonly sell: SellService = inject(SellService);
	public readonly core: CoreService = inject(CoreService);
	public readonly libraries: LibrariesService = inject(LibrariesService);
	public readonly complete: ILoading = COMPLETE;

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly library: Signal<ILibrary> = this._store.selectSignal(selectLibrary(this.libraries.id('library')));

	public ngOnInit(): void {
		if (this.library().status === LOADING) {
			const LIBRARY: number = this.libraries.id('library');
			if (LIBRARY > 0) this._store.dispatch(LIBRARY_LOAD({ library: LIBRARY }));
		}
	}

	public redirect(id: number): void {
		this.core.redirect(`admin/sell/library/${this.library().id}/collection/${id}`);
	}

	public select(id: number | null): void {
		if (id) {
			// this._store.dispatch(LIBRARY_SELECT_ELEMENT({ id: }));
		}
	}
}
