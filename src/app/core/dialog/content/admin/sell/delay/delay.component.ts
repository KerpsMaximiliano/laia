import { ChangeDetectionStrategy, Component } from '@angular/core';

// * Forms.
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Validators.
import { getErrorMessage, isNumeric } from '@validators/character.validators';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-dialog-content-delay',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ButtonComponent],
	templateUrl: './delay.component.html',
	styleUrl: './delay.component.scss'
})
export class DelayComponent {
	public readonly form: UntypedFormGroup = this._setForm();
	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public type: number = 1;

	public change(): void {
		this.type = this.type === 4 ? 1 : this.type + 1;
	}

	public transform(value: number | null): string {
		switch (this.type) {
			case 1:
				return value && value > 9 ? 'Minutos' : 'Minuto';
			case 2:
				return value && value > 9 ? 'Horas' : 'Hora';
			case 3:
				return value && value > 9 ? 'Días' : 'Día';
			default:
				return value && value > 9 ? 'Meses' : 'Mes';
		}
	}

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({ delay: new UntypedFormControl(null, isNumeric()) });
	}
}
