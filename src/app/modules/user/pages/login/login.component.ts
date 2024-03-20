import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, filter, takeUntil, tap } from 'rxjs';

// * Forms.
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Consts.
import { FAILED, LOADING } from '@consts/load.const';

// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';
import { IState } from '@interfaces/state.interface';
import { IUser } from '@user/interfaces/user.interface';

// * Services.
import { AuthService } from '@services/auth.service';
import { CoreService } from '@services/core.service';

// * Sorts.
import { ILoading } from '@sorts/loading.sort';

// * Actions.
import { SQQ_CHECK, SQQ_LOGIN, SQQ_RESET } from '@user/state/user.actions';

// * Selectors.
import { selectUser } from '@user/state/user.selectors';

// * Validators.
import { getErrorMessage, notOnlySpaces } from '@validators/character.validators';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-auth-login',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ButtonComponent],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
	public readonly core: CoreService = inject(CoreService);
	public readonly auth: AuthService = inject(AuthService);
	public readonly form: UntypedFormGroup = this._setForm();
	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public readonly loading: ILoading = LOADING;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public readonly failed: ILoading = FAILED;
	public mode: 'INITIAL' | 'SQQ' = 'INITIAL';

	public error: boolean = false;

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);
	private readonly _destroy$: Subject<void> = new Subject<void>();

	private _change: string | undefined = undefined;

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public user: Signal<ILoadableEntity<IUser>> = this._store.selectSignal(selectUser);

	public ngOnInit(): void {
		this.auth.init();

		if (this.core.get('user')) {
			this.core.back();
			return;
		}

		this._store
			.select(selectUser)
			.pipe(
				takeUntil(this._destroy$),
				tap((user) => {
					if (user.status === this.loading) {
						this.form.get('email')?.disable();
						this.form.get('password')?.disable();
						return;
					} else {
						this.form.get('email')?.enable();
						this.form.get('password')?.enable();
					}

					if (user.status === this.failed) {
						this.form.get('password')?.setErrors({ invalid: true });
						this.error = true;

						setTimeout(() => {
							this.error = false;
						}, 3000);
					}
				})
			)
			.subscribe();

		this.form
			.get('email')
			?.valueChanges.pipe(
				takeUntil(this._destroy$),
				filter((res) => res !== this._change)
			)
			.subscribe((res) => {
				if (this._change) {
					if (this._change !== res && this.user().data.check) {
						this._store.dispatch(SQQ_RESET());
					}
				}
				this._change = res;
			});
	}

	public login(type: 'CHECK' | 'LOGIN'): void {
		if (type === 'CHECK') {
			const email: string | undefined = this.form.get('email')?.value;
			if (email && this.form.get('mail')?.valid) this._store.dispatch(SQQ_CHECK({ email: email, google: false }));
		} else {
			const user: number | null = this.user().data.id;
			const password: string | undefined = this.form.get('password')?.value;
			if (user && password && this.form.valid) {
				this._store.dispatch(SQQ_LOGIN({ user, password }));
			} else {
				this.form.markAllAsTouched();
			}
		}
	}

	public ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			email: new UntypedFormControl(
				null,
				Validators.compose([Validators.required, Validators.minLength(3), Validators.email, notOnlySpaces()])
			),
			password: new UntypedFormControl(null, Validators.compose([Validators.required, Validators.minLength(6), notOnlySpaces()]))
		});
	}
}
