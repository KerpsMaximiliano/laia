import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// * Forms.
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

// * Services.
import { CoreService } from '@services/core.service';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { LoadingComponent } from '@components/loading/loading.component';

// * Validators.
import { getErrorMessage } from '@validators/character.validators';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-dialog-content-credit-days',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ButtonComponent, LoadingComponent, MatSlideToggle],
	templateUrl: './credit-days.component.html',
	styleUrl: './credit-days.component.scss'
})
export class CreditDaysComponent {
	public readonly getErrorMessage = getErrorMessage;
	public readonly form: UntypedFormGroup = this._setForm();
	// ! AUX.
	public type: boolean = false; // True: %; False: $.
	public price: number | null = 312;

	public readonly core: CoreService = inject(CoreService);

	public back(): void {
		this.core.back();
	}
	public log(): void {
		console.log(this.form.get('slide')?.value);
	}

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			days: new UntypedFormControl(null),
			aditional: new UntypedFormControl(null),
			slide: new UntypedFormControl(null)
		});
	}
}
