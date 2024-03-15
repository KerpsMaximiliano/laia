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
import { CoreService } from '@services/core.service';

// * Sorts.
import { ILoading } from '@sorts/loading.sort';

// * Actions.
import { USER_CHECK, USER_LOGIN, USER_RESTORE } from '@user/state/user.actions';

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
	public form: UntypedFormGroup = this._setForm();
	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public readonly LOADING: ILoading = LOADING;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public readonly FAILED: ILoading = FAILED;

	public error: boolean = false;

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);
	private readonly _core: CoreService = inject(CoreService);
	private readonly _unsubscribe: Subject<void> = new Subject<void>();

	private _change: string | undefined = undefined;

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public user: Signal<ILoadableEntity<IUser>> = this._store.selectSignal(selectUser);

	public ngOnInit(): void {
		if (this.user().data.id === 0) {
			this._core.redirect('');
			return;
		}

		this._store
			.select(selectUser)
			.pipe(
				takeUntil(this._unsubscribe),
				tap((user) => {
					if (user.data.check === 0) {
						this._core.redirect('auth/first');
						return;
					}

					if (user.data.logged) {
						this._core.back();
						return;
					}

					if (user.status === this.LOADING) {
						this.form.get('mail')?.disable();
						this.form.get('password')?.disable();
						return;
					} else {
						this.form.get('mail')?.enable();
						this.form.get('password')?.enable();
					}

					if (user.status === this.FAILED) {
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
			.get('mail')
			?.valueChanges.pipe(
				takeUntil(this._unsubscribe),
				filter((res) => res !== this._change)
			)
			.subscribe((res) => {
				if (this._change) {
					if (this._change !== res && this.user().data.check) {
						this._store.dispatch(USER_RESTORE());
					}
				}
				this._change = res;
			});
	}

	public login(type: 'CHECK' | 'LOGIN'): void {
		if (type === 'CHECK') {
			const email: string | undefined = this.form.get('mail')?.value;
			if (email && this.form.get('mail')?.valid) this._store.dispatch(USER_CHECK({ email: email }));
		} else {
			const email: string | undefined = this.form.get('mail')?.value;
			const password: string | undefined = this.form.get('password')?.value;
			const user: number | null = this.user().data.check;
			if (user && email && password && this.form.valid) this._store.dispatch(USER_LOGIN({ user, email, password }));
		}
	}

	public back(): void {
		if (this.user().status === this.LOADING) return;
		this._core.back();
	}

	public ngOnDestroy(): void {
		this._unsubscribe.next();
		this._unsubscribe.complete();
	}

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			mail: new UntypedFormControl(
				null,
				Validators.compose([Validators.required, Validators.minLength(3), Validators.email, notOnlySpaces()])
			),
			password: new UntypedFormControl(
				null,
				Validators.compose([Validators.required, Validators.minLength(6), notOnlySpaces()])
			)
		});
	}
}
