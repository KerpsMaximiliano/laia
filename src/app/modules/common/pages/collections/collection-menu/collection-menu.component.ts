import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, filter, takeUntil } from 'rxjs';

// * Forms.
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { LoadingComponent } from '@components/loading/loading.component';

// * Consts.
// * COMMON.
import { COMPLETE, FAILED, LOADED, LOADING, UPDATING } from '@consts/load.const';

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
import { TLibraries } from '@common/sorts/common.sort';
// * CORE.
import { ILoading } from '@sorts/loading.sort';

// * Validators.
import { getErrorMessage, notOnlySpaces } from '@validators/character.validators';

// * Actions.
import {
	COLLECTION_CREATE,
	COLLECTION_CREATE_REF,
	COLLECTION_DELETE,
	COLLECTION_MENU_LOAD,
	COLLECTION_RENAME
} from '@common/state/common.actions';

// * Selectors.
import { selectCollectionInformation, selectCollectionMenu } from '@common/state/common.selectors';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-common-collection-menu',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ButtonComponent, LoadingComponent],
	templateUrl: './collection-menu.component.html',
	styleUrl: './collection-menu.component.scss'
})
export class CollectionMenuComponent implements OnInit, OnDestroy {
	public readonly collections: CollectionsService = inject(CollectionsService);
	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly form: UntypedFormGroup = this._setForm();

	public readonly loading: ILoading = LOADING;
	public readonly loaded: ILoading = LOADED;
	public readonly updating: ILoading = UPDATING;
	public readonly failed: ILoading = FAILED;
	public readonly complete: ILoading = COMPLETE;

	public information: Signal<ICollection['information']> | undefined = undefined;
	public menu: Signal<ICollection['menu']> | undefined = undefined;

	public update: { status: boolean; element: 'CREATE' | 'DUPLICATE' | null } = { status: false, element: null };
	public error: boolean = false;

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);
	private readonly _libraries: LibrariesService = inject(LibrariesService);
	private readonly _destroy$: Subject<void> = new Subject<void>();

	private _change: string | undefined = undefined;
	private _check: boolean = true;

	public ngOnInit(): void {
		const tLibrary: TLibraries | null = this._libraries.tLibrary();
		const library: number | null = this._libraries.library();
		const collection: number | null = this.collections.collection();

		if (!tLibrary || !library || !collection) return;

		this.information = this._store.selectSignal(selectCollectionInformation({ tLibrary, collection }));
		this.menu = this._store.selectSignal(selectCollectionMenu({ tLibrary, collection }));

		this._check = true;

		if (this.menu().status !== this.complete)
			this._store.dispatch(COLLECTION_MENU_LOAD({ tLibrary, library, collection, detail: this.menu().status !== this.loaded }));

		this._store
			.select(selectCollectionInformation({ tLibrary, collection }))
			.pipe(takeUntil(this._destroy$))
			.subscribe((information: ICollection['information']) => {
				if (information.status === this.loading || information.status === this.complete) {
					this._check = false;

					this.form
						.get('title')
						?.valueChanges.pipe(
							debounceTime(500),
							filter(() => !(this.form.get('title')?.dirty && this.form.get('title')?.pristine) && this.form.valid),
							takeUntil(this._destroy$)
						)
						.subscribe((res) => {
							if (this._check) {
								this._check = false;
								return;
							}

							if (
								this.information &&
								this.information().status === this.complete &&
								res !== this._change &&
								res !== this.information().title
							) {
								const tLibrary: TLibraries | null = this._libraries.tLibrary();
								const library: number | null = this._libraries.library();
								const collection: number | null = this.collections.collection();

								if (tLibrary && library && collection)
									this._store.dispatch(
										COLLECTION_RENAME({
											tLibrary,
											library,
											collection,
											title: res
										})
									);
							}

							this._change = res;
						});

					this.form.disable();
				}

				if (information.status === this.updating) this.form.disable();

				if (information.status === this.complete) {
					this.form.enable();
					this.form.get('title')?.setValue(information.title);
					return;
				}

				if (information.status === this.failed) {
					this.form.get('title')?.setErrors({ invalid: true });
					this.error = true;

					setTimeout(() => {
						this.error = false;
					}, 3000);

					return;
				}
			});
	}

	public create(): void {
		const tLibrary: TLibraries | null = this._libraries.tLibrary();
		const library: number | null = this._libraries.library();

		if (!tLibrary || !library) return;

		this.form.disable();
		this.update = { status: true, element: 'CREATE' };
		this._store.dispatch(COLLECTION_CREATE({ tLibrary, library }));
	}

	public duplicate(): void {
		const tLibrary: TLibraries | null = this._libraries.tLibrary();
		const library: number | null = this._libraries.library();
		const collection: number | null = this.collections.collection();

		if (!tLibrary || !library || !collection) return;

		this.form.disable();
		this.update = { status: true, element: 'DUPLICATE' };
		this._store.dispatch(COLLECTION_CREATE_REF({ tLibrary, library, collection }));
	}

	public remove(): void {
		const tLibrary: TLibraries | null = this._libraries.tLibrary();
		const library: number | null = this._libraries.library();
		const collection: number | null = this.collections.collection();

		if (!tLibrary || !library || !collection) return;

		this._store.dispatch(COLLECTION_DELETE({ tLibrary, library, collection }));
	}

	public ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			title: new UntypedFormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20), notOnlySpaces()])
		});
	}
}
