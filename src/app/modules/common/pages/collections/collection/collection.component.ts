import { ChangeDetectionStrategy, Component, OnInit, Signal, inject } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { ImgComponent } from '@components/img/img.component';

// * Services
import { Store } from '@ngrx/store';
import { CoreService } from '@services/core.service';
import { LoadingComponent } from '../../../../../core/components/loading/loading.component';
import { COMPLETE, LOADING } from '../../../../../core/constants/load.const';
import { ILoadableEntity } from '../../../../../core/interfaces/load.interface';
import { IState } from '../../../../../core/interfaces/state.interface';
import { ILoading } from '../../../../../core/sorts/loading.sort';
import { ICollection } from '../../../interfaces/collection.interface';
import { CollectionsService } from '../../../services/collections.service';
import { LibrariesService } from '../../../services/libraries.service';
import { COLLECTION_LOAD, LIBRARY_SELECT_ELEMENT } from '../../../state/common.actions';
import { selectCollection, selectElementSelected } from '../../../state/common.selectors';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-library-collection',
	standalone: true,
	imports: [ButtonComponent, ImgComponent, LoadingComponent],
	templateUrl: './collection.component.html',
	styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnInit {
	public readonly core: CoreService = inject(CoreService);

	public readonly complete: ILoading = COMPLETE;
	public readonly loading: ILoading = LOADING;

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);
	private readonly _libraries: LibrariesService = inject(LibrariesService);
	private readonly _collections: CollectionsService = inject(CollectionsService);

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly collection: Signal<ILoadableEntity<ICollection>> = this._store.selectSignal(
		selectCollection(this._libraries.id(), this._collections.id())
	);

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly selected: Signal<number | null> = this._store.selectSignal(selectElementSelected(this._libraries.id()));

	public ngOnInit(): void {
		if (this.collection().status === this.loading) this._store.dispatch(COLLECTION_LOAD({ collection: this._collections.id() }));
	}

	public select(id: number | null): void {
		if (id) this._store.dispatch(LIBRARY_SELECT_ELEMENT({ library: this._libraries.id(), element: id }));
	}
}
