import { ChangeDetectionStrategy, Component, OnInit, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { ImgComponent } from '@components/img/img.component';
import { LoadingComponent } from '@components/loading/loading.component';

// * Consts.
import { COLLECTION_ALIAS } from '@common/constants/collection.const';
import { COMPLETE, FAILED, LOADED, LOADING, UPDATING } from '@consts/load.const';

// * Directives.
import { ContentViewDirective } from '@common/directives/content-view.directive';

// * Interfaces.
// * COMMON.
import { ICollection } from '@common/interfaces/collection.interface';
// * CORE.
import { IState } from '@interfaces/state.interface';

// * Services
import { CollectionsService } from '@common/services/collections.service';
import { LibrariesService } from '@common/services/libraries.service';

// * Sorts.
// * COMMON.
import { TCollections, TLibraries } from '@common/sorts/common.sort';
// * CORE.
import { ILoading } from '@sorts/loading.sort';

// * Actions.
import { COLLECTION_ELEMENTS_LOAD, COLLECTION_VIEW_LOAD, LIBRARY_SELECT_ELEMENT } from '@common/state/common.actions';

// * Selectors.
import {
	selectCollectionInformation,
	selectCollectionMiniatures,
	selectCollectionView,
	selectLibrarySelected
} from '@common/state/common.selectors';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-common-collection',
	standalone: true,
	imports: [ButtonComponent, ImgComponent, LoadingComponent, ContentViewDirective],
	templateUrl: './collection.component.html',
	styleUrl: '../../common.scss'
})
export class CollectionComponent implements OnInit {
	public readonly collections: CollectionsService = inject(CollectionsService);
	public readonly libraries: LibrariesService = inject(LibrariesService);

	public readonly loading: ILoading = LOADING;
	public readonly loaded: ILoading = LOADED;
	public readonly failed: ILoading = FAILED;
	public readonly updating: ILoading = UPDATING;
	public readonly complete: ILoading = COMPLETE;

	public readonly alias: { [key in keyof TCollections]: string } = COLLECTION_ALIAS;

	public information: Signal<ICollection['information']> | undefined = undefined;
	public view: Signal<ICollection['view']> | undefined = undefined;
	public miniatures: Signal<ICollection['miniatures']> | undefined = undefined;
	public selected: Signal<number | null> | undefined = undefined;

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);

	public ngOnInit(): void {
		const tLibrary: TLibraries | null = this.libraries.tLibrary();
		const library: number | null = this.libraries.library();
		const collection: number | null = this.collections.collection();

		if (!tLibrary || !library || !collection) return;

		this.information = this._store.selectSignal(selectCollectionInformation({ tLibrary, collection }));
		this.view = this._store.selectSignal(selectCollectionView({ tLibrary, collection }));
		this.miniatures = this._store.selectSignal(selectCollectionMiniatures({ tLibrary, collection }));
		this.selected = this._store.selectSignal(selectLibrarySelected(tLibrary));

		if (this.view().status !== this.loading) return;

		this._store.dispatch(COLLECTION_VIEW_LOAD({ tLibrary, library, collection }));
	}

	public select(element: number | null): void {
		const tLibrary: TLibraries | null = this.libraries.tLibrary();
		if (!element || !tLibrary) return;
		this._store.dispatch(LIBRARY_SELECT_ELEMENT({ tLibrary, element }));
	}

	public getPage(): void {
		if (!this.view) return;

		const tLibrary: TLibraries | null = this.libraries.tLibrary();
		const collection: number | null = this.collections.collection();

		if (!tLibrary || !collection || this.view().count === this.view().elements.length) return;

		this._store.dispatch(
			COLLECTION_ELEMENTS_LOAD({
				tLibrary,
				collection,
				page: Math.ceil(this.view().elements.length / 10) + 1
			})
		);
	}
}
