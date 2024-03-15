import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// * Forms.
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

// * Validators.

// * Material.
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Services.
import { CoreService } from '@services/core.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-deltime',
	standalone: true,
	imports: [
		ButtonComponent,
		MatExpansionModule,
		MatChipsModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatInputModule
	],
	templateUrl: './del-time.component.html',
	styleUrl: './del-time.component.scss'
})
export class DeliveryTimeComponent {
	public mode: 'DIA' | 'FECHA' | undefined = undefined;
	public readonly form: UntypedFormGroup = this._setForm();
	public readonly core: CoreService = inject(CoreService);

	public select(mode: 'DIA' | 'FECHA'): void {
		this.mode = mode;
	}

	public action(action: number): void {
		switch (action) {
			case 0:
				// this.sell.redirect('sell/article');
				break;
		}
	}

	public logDays(): void {
		console.log(this.form.get('days')?.value);
	}

	private _setForm(): UntypedFormGroup {
		return new UntypedFormGroup({
			name: new UntypedFormControl(null),
			amount: new UntypedFormControl(null),
			days: new UntypedFormControl(null)
		});
	}
}
