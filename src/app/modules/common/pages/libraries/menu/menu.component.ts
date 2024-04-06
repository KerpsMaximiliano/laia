import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, filter, takeUntil } from 'rxjs';

// * Forms.
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { LoadingComponent } from '@components/loading/loading.component';

// * Consts.
import { COMPLETE, FAILED, UPDATING } from '@consts/load.const';

// * Interfaces.
import { ILibraryConf } from '@common/interfaces/libraries.interface';
import { IState } from '@interfaces/state.interface';

// * Services.
import { LibrariesService } from '@common/services/libraries.service';
import { CoreService } from '@services/core.service';

// * Sorts.
import { ILoading } from '@sorts/loading.sort';

// * Validators.
import { getErrorMessage, notOnlySpaces } from '@validators/character.validators';

// * Actions.
import { LIBRARY_CONF_LOAD, LIBRARY_RENAME } from '@common/state/common.actions';

// * Selectors.
import { selectLibraryConfiguration } from '@common/state/common.selectors';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-library-menu',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ButtonComponent, LoadingComponent],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, OnDestroy {
	public readonly core: CoreService = inject(CoreService);
	public readonly libraries: LibrariesService = inject(LibrariesService);

	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly form: UntypedFormGroup = this._setForm();

	public readonly updating: ILoading = UPDATING;
	public readonly complete: ILoading = COMPLETE;

	public error: boolean = false;

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);
	private readonly _destroy$: Subject<void> = new Subject<void>();

	private _change: string | undefined = undefined;

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly conf: Signal<ILibraryConf> = this._store.selectSignal(selectLibraryConfiguration(this.libraries.id()));

	public ngOnInit(): void {
		if (this.conf().conf === null) {
			const TITLE: boolean = this.conf().title === '';
			this._store.dispatch(LIBRARY_CONF_LOAD({ library: this.libraries.id(), title: TITLE }));
		}

		// ! Acá se debe filtrar.
		this._store
			.select(selectLibraryConfiguration(this.libraries.id()))
			.pipe(takeUntil(this._destroy$))
			.subscribe((conf: ILibraryConf) => {
				// if (conf.status === LOADING || conf.default === null || conf.title === '') return;

				if (conf.status === FAILED) {
					this.form.get('title')?.setErrors({ invalid: true });
					this.error = true;

					setTimeout(() => {
						this.error = false;
					}, 3000);
				}
			});

		// ! Se debe corregir el filtro.
		this.form
			.get('title')
			?.valueChanges.pipe(
				takeUntil(this._destroy$),
				debounceTime(500),
				filter((res) => this.form.valid && res && res !== this._change)
			)
			.subscribe((res) => {
				// if (this.conf().status === this.complete && this.conf().default !== null && res !== this._change && res !== this.conf().title) {
				if (this.conf().status === this.complete && res !== this._change && res !== this.conf().title) {
					this._store.dispatch(LIBRARY_RENAME({ library: this.libraries.id(), title: res }));
				}
				this._change = res;
			});

		this.form.get('title')?.setValue(this.conf().title);
	}

	public back(): void {
		this.libraries.redirect(`${this.libraries.id()}`);
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
