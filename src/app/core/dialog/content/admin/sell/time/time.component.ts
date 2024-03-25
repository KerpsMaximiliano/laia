import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { getErrorMessage } from '@validators/character.validators';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-dialog-content-time',
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
	templateUrl: './time.component.html',
	styleUrl: './time.component.scss'
})
export class TimeRangeComponent {
	public readonly form: UntypedFormGroup = this._setForm();
	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public modeTo: 'AM' | 'PM' = 'AM'; // Desde
	public modeFrom: 'AM' | 'PM' = 'PM'; // Hasta

	public updateValue(inputElement: HTMLInputElement, maxValue: number): void {
		const value = parseInt(inputElement.value, 10);
		if (value > maxValue) {
			inputElement.value = maxValue.toString();
		}
		if (value < 0) {
			inputElement.value = String(0);
		}
	}

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			sinceHour: new UntypedFormControl(null),
			sinceMin: new UntypedFormControl(null),
			untilHour: new UntypedFormControl(null),
			untilMin: new UntypedFormControl(null)
		});
	}
}
