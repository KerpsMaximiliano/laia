import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { LoadingComponent } from '@components/loading/loading.component';

// * Consts.
// * COMMON.
import { MINIATURES_ALIAS } from '@common/constants/library.const';
// * CORE.
import { COMPLETE, LOADING } from '@consts/load.const';

// * Interfaces.
// * COMMON.
import { ICollection } from '@common/interfaces/collection.interface';
// * CORE.
import { IState } from '@interfaces/state.interface';

// * Services.
import { CollectionsService } from '@common/services/collections.service';
import { LibrariesService } from '@common/services/libraries.service';

// * Sorts.
// * COMMON.
import { TLibraries, TMiniature } from '@common/sorts/common.sort';
// * CORE.
import { ILoading } from '@sorts/loading.sort';

// * Actions.
import { COLLECTION_MINIATURES_LOAD, COLLECTION_MINIATURES_SELECT, COLLECTION_MINIATURES_UPDATE } from '@common/state/common.actions';

// * Selectors.
import { selectCollectionInformation, selectCollectionMiniatures } from '@common/state/common.selectors';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-common-collection-miniatures',
	standalone: true,
	imports: [ButtonComponent, LoadingComponent],
	templateUrl: './collection-miniatures.component.html',
	styleUrl: './collection-miniatures.component.scss'
})
export class CollectionMiniaturesComponent implements OnInit, OnDestroy {
	public readonly collections: CollectionsService = inject(CollectionsService);
	public readonly alias = MINIATURES_ALIAS;

	public readonly loading: ILoading = LOADING;
	public readonly complete: ILoading = COMPLETE;

	public information: Signal<ICollection['information']> | undefined = undefined;
	public miniatures: Signal<ICollection['miniatures']> | undefined = undefined;

	public mode: keyof ICollection['miniatures'] = 'header';

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);
	private readonly _libraries: LibrariesService = inject(LibrariesService);

	public ngOnInit(): void {
		const tLibrary: TLibraries | null = this._libraries.tLibrary();
		const library: number | null = this._libraries.library();
		const collection: number | null = this.collections.collection();

		if (!tLibrary || !library || !collection) return;

		this.information = this._store.selectSignal(selectCollectionInformation({ tLibrary, collection }));
		this.miniatures = this._store.selectSignal(selectCollectionMiniatures({ tLibrary, collection }));

		if (this.miniatures().status !== this.complete)
			this._store.dispatch(COLLECTION_MINIATURES_LOAD({ tLibrary, library, collection, detail: this.information().title === '' }));
	}

	public check(item: TMiniature): boolean {
		if (!this.miniatures) return false;

		switch (this.mode) {
			case 'header':
				return this._index(this.miniatures().header, item);
			case 'title':
				return this._index(this.miniatures().title, item);
			case 'subtitle':
				return this._index(this.miniatures().subtitle, item);
			default:
				return false;
		}
	}

	public select(prop: TMiniature): void {
		const tLibrary: TLibraries | null = this._libraries.tLibrary();
		const collection: number | null = this.collections.collection();

		if (!tLibrary || !collection) return;

		this._store.dispatch(COLLECTION_MINIATURES_SELECT({ tLibrary, collection, mode: this.mode, prop }));
	}

	public ngOnDestroy(): void {
		if (!this.miniatures) return;

		const tLibrary: TLibraries | null = this._libraries.tLibrary();
		const collection: number | null = this.collections.collection();

		if (!tLibrary || !collection) return;

		this._store.dispatch(
			COLLECTION_MINIATURES_UPDATE({
				tLibrary,
				collection,
				props: this.miniatures().props,
				header: this.miniatures().header,
				title: this.miniatures().title,
				subtitle: this.miniatures().subtitle
			})
		);
	}

	private _index(props: TMiniature[], item: TMiniature): boolean {
		return props.some((prop) => prop === item);
	}
}
