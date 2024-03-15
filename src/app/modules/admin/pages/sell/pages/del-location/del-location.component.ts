import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// * Forms.
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

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

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-dialog-content-del-location',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ButtonComponent, LoadingComponent],
	templateUrl: './del-location.component.html',
	styleUrl: './del-location.component.scss'
})
export class DeliveryLocationComponent {
	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly form: UntypedFormGroup = this._setForm();
	public readonly core: CoreService = inject(CoreService);

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			starting: new UntypedFormControl(null),
			amount: new UntypedFormControl(null),
			untilKm: new UntypedFormControl(null),
			eachKm: new UntypedFormControl(null),
			limitExtraAmount: new UntypedFormControl(null)
		});
	}
}
