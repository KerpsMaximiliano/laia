import { ChangeDetectionStrategy, Component, OnInit, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';

// * Forms.
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';
import { IState } from '@interfaces/state.interface';
import { IUser } from '@user/interfaces/user.interface';

// * Services.
import { CoreService } from '@services/core.service';

// * Validators.
import { getErrorMessage, isNumeric, notOnlySpaces } from '@validators/character.validators';

// * Actions.
import { USER_INFO } from '@user/state/user.actions';

// * Selectors.
import { selectUser } from '@user/state/user.selectors';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// * Shared.

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-auth-first',
	standalone: true,
	imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, ButtonComponent],
	templateUrl: './first.component.html',
	styleUrl: './first.component.scss'
})
export class FirstComponent implements OnInit {
	public readonly core: CoreService = inject(CoreService);
	public readonly getErrorMessage = getErrorMessage;
	public readonly form = this._setForm();

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public user: Signal<ILoadableEntity<IUser>> = this._store.selectSignal(selectUser);

	public ngOnInit(): void {
		// if (!this.user().data.logged || this.user().data.check !== 0 || this.user().data.check === null) {
		// 	this.core.redirect('');
		// }
		// ! Fix this.
		console.log('FirstComponent => OnInit');
	}

	public save(): void {
		// ! Fix this.
		if (this.form.valid) {
			if (
				this.form.get('name')?.value ||
				this.form.get('surname')?.value ||
				this.form.get('phone')?.value ||
				this.form.get('password')?.value
			) {
				this._store.dispatch(
					USER_INFO({
						name: this.form.get('name')?.value,
						surname: this.form.get('surname')?.value,
						phone: this.form.get('phone')?.value,
						password: this.form.get('password')?.value
					})
				);
				this.core.back();
			}
		} else {
			console.log('no valido', this.form.valid);
		}
	}

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			name: new UntypedFormControl(null, Validators.compose([Validators.minLength(1), notOnlySpaces()])),
			surname: new UntypedFormControl(null, Validators.compose([Validators.minLength(1), notOnlySpaces()])),
			phone: new UntypedFormControl(null, Validators.compose([Validators.minLength(6), isNumeric()])),
			password: new UntypedFormControl(null, Validators.compose([Validators.minLength(6), notOnlySpaces()]))
		});
	}
}
