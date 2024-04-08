import { ChangeDetectionStrategy, Component, OnInit, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { ImgComponent } from '@components/img/img.component';
import { LoadingComponent } from '@components/loading/loading.component';

// * Conts.
// * COMMON.
import { COLLECTION_ALIAS } from '@common/constants/collection.const';
// * CORE.
import { COMPLETE, LOADING } from '@consts/load.const';

// * Interfaces.
// * COMMON.
import { ILibrary } from '@common/interfaces/libraries.interface';
// * CORE.
import { IState } from '@interfaces/state.interface';

// * Sorts.
// * COMMON.
import { TCollection } from '@common/sorts/common.sort';
// * CORE.
import { ILoading } from '@sorts/loading.sort';

// * Services.
// * COMMON.
import { LibrariesService } from '@common/services/libraries.service';
// * SELL.
import { SellService } from '@sell/services/sell.service';
// * CORE.
import { CoreService } from '@services/core.service';

// * Actions.
import { LIBRARY_LOAD } from '@common/state/common.actions';

// * Selectors.
import { selectLibrary } from '@common/state/common.selectors';

// * Material.
import { MatExpansionModule } from '@angular/material/expansion';

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
	public readonly libraries: LibrariesService = inject(LibrariesService);
	public readonly core: CoreService = inject(CoreService);

	public readonly alias: { [key in keyof TCollection]: string } = COLLECTION_ALIAS;

	public readonly complete: ILoading = COMPLETE;
	public readonly loading: ILoading = LOADING;

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly library: Signal<ILibrary> = this._store.selectSignal(selectLibrary(this.libraries.id()));

	public ngOnInit(): void {
		if (this.library().status === this.loading) {
			const LIBRARY: number = this.libraries.id();
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
