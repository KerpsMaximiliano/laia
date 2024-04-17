import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, filter, takeUntil } from 'rxjs';

// * Forms.
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { LoadingComponent } from '@components/loading/loading.component';

// * Consts.
import { COMPLETE, FAILED, LOADED, LOADING, UPDATING } from '@consts/load.const';

// * Interfaces.
// * COMMON.
import { ILibrary } from '@common/interfaces/libraries.interface';
// * CORE.
import { IState } from '@interfaces/state.interface';

// * Services.
import { LibrariesService } from '@common/services/libraries.service';

// * Sorts.
// * COMMON.
import { TLibraries } from '@common/sorts/common.sort';
// * CORE.
import { ILoading } from '@sorts/loading.sort';

// * Validators.
import { getErrorMessage, notOnlySpaces } from '@validators/character.validators';

// * Actions.
import { COLLECTION_CREATE, LIBRARY_MENU_LOAD, LIBRARY_RENAME } from '@common/state/common.actions';

// * Selectors.
import { selectLibraryInformation, selectLibraryMenu } from '@common/state/common.selectors';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-common-library-menu',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ButtonComponent, LoadingComponent],
	templateUrl: './library-menu.component.html',
	styleUrl: './library-menu.component.scss'
})
export class LibraryMenuComponent implements OnInit, OnDestroy {
	public readonly libraries: LibrariesService = inject(LibrariesService);
	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly form: UntypedFormGroup = this._setForm();

	public readonly loading: ILoading = LOADING;
	public readonly loaded: ILoading = LOADED;
	public readonly updating: ILoading = UPDATING;
	public readonly complete: ILoading = COMPLETE;

	public error: boolean = false;

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);
	private readonly _destroy$: Subject<void> = new Subject<void>();

	private _change: string | undefined = undefined;
	private _check: boolean = true;

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly information: Signal<ILibrary['information']> = this._store.selectSignal(selectLibraryInformation('buyers'));
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly menu: Signal<ILibrary['menu']> = this._store.selectSignal(selectLibraryMenu('buyers'));

	public ngOnInit(): void {
		const tLibrary: TLibraries | null = this.libraries.tLibrary();
		const library: number | null = this.libraries.library();

		if (!tLibrary || !library) return;

		this._check = true;

		if (this.menu().status !== this.complete)
			this._store.dispatch(LIBRARY_MENU_LOAD({ tLibrary, library, detail: this.menu().status !== this.loaded }));

		this._store
			.select(selectLibraryInformation('buyers'))
			.pipe(takeUntil(this._destroy$))
			.subscribe((information: ILibrary['information']) => {
				if (information.status === this.loading) {
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

							if (this.information().status === this.complete && res !== this._change && res !== this.information().title)
								this._store.dispatch(LIBRARY_RENAME({ tLibrary, library, title: res }));

							this._change = res;
						});

					return;
				}

				if (information.status === this.complete) {
					this.form.get('title')?.setValue(this.information().title);

					return;
				}

				if (information.status === FAILED) {
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
		const tLibrary: TLibraries | null = this.libraries.tLibrary();
		const library: number | null = this.libraries.library();

		if (!tLibrary || !library) return;

		this._store.dispatch(COLLECTION_CREATE({ tLibrary, library }));
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
