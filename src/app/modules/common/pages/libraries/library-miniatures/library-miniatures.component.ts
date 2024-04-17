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
import { ILibrary } from '@common/interfaces/libraries.interface';
// * CORE.
import { IState } from '@interfaces/state.interface';

// * Services.
import { LibrariesService } from '@common/services/libraries.service';

// * Sorts.
// * COMMON.
import { TLibraries, TMiniature } from '@common/sorts/common.sort';
// * CORE.
import { ILoading } from '@sorts/loading.sort';

// * Actions.
import { LIBRARY_MINIATURES_LOAD, LIBRARY_MINIATURES_UPDATE, LIBRARY_MINIATURE_SELECT } from '@common/state/common.actions';

// * Selectors.
import { selectLibraryInformation, selectLibraryMiniatures } from '@common/state/common.selectors';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-common-library-miniatures',
	standalone: true,
	imports: [ButtonComponent, LoadingComponent],
	templateUrl: './library-miniatures.component.html',
	styleUrl: './library-miniatures.component.scss'
})
export class LibraryMiniaturesComponent implements OnInit, OnDestroy {
	public readonly libraries: LibrariesService = inject(LibrariesService);
	public readonly alias = MINIATURES_ALIAS;

	public readonly loading: ILoading = LOADING;
	public readonly complete: ILoading = COMPLETE;

	public miniatures: Signal<ILibrary['miniatures']> | undefined = undefined;

	public information: Signal<ILibrary['information']> | undefined = undefined;

	public mode: keyof ILibrary['miniatures'] = 'header';

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);

	public ngOnInit(): void {
		const tLibrary: TLibraries | null = this.libraries.tLibrary();
		const library: number | null = this.libraries.library();

		if (!tLibrary || !library) return;

		this.information = this._store.selectSignal(selectLibraryInformation(tLibrary));
		this.miniatures = this._store.selectSignal(selectLibraryMiniatures(tLibrary));

		if (this.miniatures().status === this.complete) return;

		this._store.dispatch(LIBRARY_MINIATURES_LOAD({ tLibrary, library, detail: this.information().title === '' }));
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
		const tLibrary: TLibraries | null = this.libraries.tLibrary();
		if (!tLibrary) return;
		this._store.dispatch(LIBRARY_MINIATURE_SELECT({ tLibrary, mode: this.mode, prop }));
	}

	public ngOnDestroy(): void {
		const tLibrary: TLibraries | null = this.libraries.tLibrary();
		const library: number | null = this.libraries.library();

		if (!tLibrary || !library || !this.miniatures) return;

		const props: TMiniature[] | undefined = this.miniatures().props;
		const header: TMiniature[] | undefined = this.miniatures().header;
		const title: TMiniature[] | undefined = this.miniatures().title;
		const subtitle: TMiniature[] | undefined = this.miniatures().subtitle;

		this._store.dispatch(LIBRARY_MINIATURES_UPDATE({ tLibrary, library, props, header, title, subtitle }));
	}

	private _index(props: TMiniature[], item: TMiniature): boolean {
		return props.some((prop) => prop === item);
	}
}
