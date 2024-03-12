import { ChangeDetectionStrategy, Component } from '@angular/core';

// * Forms.
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Validators.
import { getErrorMessage, notOnlySpaces } from '@app/core/validators/character.validators';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-dialog-content-tag',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ButtonComponent],
	templateUrl: './tag.component.html',
	styleUrl: './tag.component.scss'
})
export class TagComponent {
	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly form: UntypedFormGroup = this._setForm();

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			tag: new UntypedFormControl(null, Validators.compose([notOnlySpaces()]))
		});
	}
}
