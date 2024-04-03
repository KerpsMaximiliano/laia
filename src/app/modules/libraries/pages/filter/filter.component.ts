import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { BtnInputComponent } from '@components/mat-input/mat-input.component';

// * Services.
import { CoreService } from '@services/core.service';

// * Material.
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';

// !AUX
// * Mock.
import { IItems } from '../../../admin/pages/sell/interfaces/sell.interface';
import { data } from './mock';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-library-collection-filter',
	standalone: true,
	providers: [provideNativeDateAdapter()],
	imports: [MatExpansionModule, MatFormFieldModule, MatDatepickerModule, ButtonComponent, BtnInputComponent, MatSliderModule],
	templateUrl: './filter.component.html',
	styleUrl: './filter.component.scss'
})
export class ReportFilterComponent {
	public core: CoreService = inject(CoreService);

	// !AUX
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public data?: any = JSON.parse(JSON.stringify(data));
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public initialData?: any = JSON.parse(JSON.stringify(data));

	public save(): void {
		this.initialData = JSON.parse(JSON.stringify(this.data));
	}

	public selectRange(): void {
		this.core.open('DATE-RANGE');
	}

	public change(): boolean {
		for (let i = 0; i < this.data.length; i++) {
			const oldItem = this.data[i];
			const newItem = this.initialData[i];

			if (oldItem.items.length !== newItem.items.length) {
				return true;
			}

			for (let j = 0; j < oldItem.items.length; j++) {
				const oldCheck = oldItem.items[j].check;
				const newCheck = newItem.items[j].check;

				if (oldCheck !== newCheck) {
					return true;
				}
			}
		}

		return false;
	}

	public check(value: IItems[], index: number, multiple: number): void {
		value[index].check = value[index].check === 1 ? 0 : 1;
		if (multiple === 1) {
			value.forEach((item, i) => {
				if (i !== index) {
					item.check = 0;
				}
			});
		}
	}

	public calcTotal(data: { id: string; sales: number; check: number }[]): string {
		let total: number = 0;
		let check: number = 0;
		let id: string = '';
		for (const item of data) {
			total++;
			if (item.check === 1) {
				id = item.id;
				check++;
			}
		}

		return total === check ? 'Todos' : check === 0 ? 'Ninguno' : check === 1 ? `${id}` : `${check}/${total}`;
	}
}
