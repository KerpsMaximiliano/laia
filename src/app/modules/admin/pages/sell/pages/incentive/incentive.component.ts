import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// * Forms.
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Pipes.
import { currency } from '@pipes/currency.pipe';

// * Services.
import { CoreService } from '@services/core.service';

// * Validators.
import { getErrorMessage } from '@validators/character.validators';

// * Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-incentive',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ButtonComponent],
	templateUrl: './incentive.component.html',
	styleUrl: './incentive.component.scss'
})
export class IncentiveComponent {
	public readonly core: CoreService = inject(CoreService);
	public readonly getErrorMessage: (control: AbstractControl<unknown, unknown>) => string = getErrorMessage;
	public readonly currency: (value: number | null | undefined) => string = currency;
	public readonly form: UntypedFormGroup = this._setupForm();
	public readonly information: string[] = [
		'Precio del artículo',
		'Inversión de producirlo',
		'Monto de este incentivo',
		'Beneficio bruto'
	];

	// ! AUX.
	public type: boolean = false; // True: %; False: $.
	public price: number | null = 312;
	public invest: number | null = 32;
	public subtotal: number | null = (this.price ?? 0) - (this.invest ?? 0);

	public incentive(): string {
		const price: number = this.price ?? 0;
		const incentive: number = this.form.get('incentive')?.value ?? 0;
		return this.currency(this.type ? (price / 100) * incentive : incentive);
	}

	public benefit(): string {
		const subtotal: number = this.subtotal ?? 0;
		const incentive: number = this.form.get('incentive')?.value ?? 0;
		return this.currency(this.type ? subtotal - (subtotal / 100) * incentive : subtotal - incentive);
	}

	private _setupForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			incentive: new UntypedFormControl(null)
		});
	}
}
