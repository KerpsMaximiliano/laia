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
import { COMPLETE, LOADED, LOADING } from '@consts/load.const';

// * Directives.
import { ContentViewDirective } from '@common/directives/content-view.directive';

// * Interfaces.
// * COMMON.
import { ILibrary } from '@common/interfaces/libraries.interface';
// * CORE.
import { IState } from '@interfaces/state.interface';

// * Sorts.
// * COMMON.
import { TCollections, TLibraries } from '@common/sorts/common.sort';
// * CORE.
import { ILoading } from '@sorts/loading.sort';

// * Services.
// * COMMON.
import { LibrariesService } from '@common/services/libraries.service';
// * SELL.
// * CORE.
import { CoreService } from '@services/core.service';

// * Actions.
import { COLLECTION_ELEMENTS_LOAD, COLLECTION_EXPANDED, LIBRARY_VIEW_LOAD } from '@common/state/common.actions';

// * Selectors.
import { selectLibraryInformation, selectLibraryView } from '@common/state/common.selectors';

// * Material.
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-common-library',
	standalone: true,
	imports: [MatExpansionModule, ButtonComponent, ImgComponent, LoadingComponent, ContentViewDirective],
	templateUrl: './library.component.html',
	styleUrl: '../../common.scss'
})
export class LibraryComponent implements OnInit {
	public readonly libraries: LibrariesService = inject(LibrariesService);
	public readonly core: CoreService = inject(CoreService);

	public readonly alias: { [key in keyof TCollections]: string } = COLLECTION_ALIAS;

	public readonly loading: ILoading = LOADING;
	public readonly loaded: ILoading = LOADED;
	public readonly complete: ILoading = COMPLETE;

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly view: Signal<ILibrary['view']> = this._store.selectSignal(selectLibraryView('buyers'));
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly information: Signal<ILibrary['information']> = this._store.selectSignal(selectLibraryInformation('buyers'));

	public ngOnInit(): void {
		const tLibrary: TLibraries | null = this.libraries.tLibrary();
		const library: number | null = this.libraries.library();

		if (!tLibrary || !library || this.view().status === this.complete) return;

		this._store.dispatch(LIBRARY_VIEW_LOAD({ tLibrary, library }));
	}

	public expanded(collection: number): void {
		const tLibrary: TLibraries | null = this.libraries.tLibrary();

		if (!tLibrary) return;

		this._store.dispatch(COLLECTION_EXPANDED({ tLibrary, collection }));
	}

	public getPage(count: number, length: number, collection: number): void {
		if (count === length) return;

		const tLibrary: TLibraries | null = this.libraries.tLibrary();

		if (!tLibrary) return;

		this._store.dispatch(COLLECTION_ELEMENTS_LOAD({ tLibrary, collection, page: Math.ceil(length / 10) + 1 }));
	}
}
