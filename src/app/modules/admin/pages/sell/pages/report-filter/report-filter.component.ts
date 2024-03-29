import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Services.
import { CoreService } from '@services/core.service';

// * Material.
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';

// !AUX
// * Mock.
import { data } from './mock';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-report-filter',
	standalone: true,
	providers: [provideNativeDateAdapter()],
	imports: [ButtonComponent, MatExpansionModule, MatFormFieldModule, MatDatepickerModule],
	templateUrl: './report-filter.component.html',
	styleUrl: './report-filter.component.scss'
})
export class ReportFilterComponent {
	public core: CoreService = inject(CoreService);

	public panelOpenState: boolean[] = [false, false, false, false, false, false];

	public globalTotal: number = 0;

	// !AUX
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public data?: any = JSON.parse(JSON.stringify(data));
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public initialData?: any = JSON.parse(JSON.stringify(data));

	public save(): void {
		console.log(this.data);
		this.initialData = JSON.parse(JSON.stringify(this.data));
	}

	public change(): boolean {
		for (const prop in this.data) {
			for (let i = 0; i < this.data[prop].length; i++) {
				const item1 = this.data[prop][i];
				const item2 = this.initialData[prop][i];

				if (item1.id !== item2.id || item1.sales !== item2.sales || item1.check !== item2.check) {
					return true;
				}
			}
		}
		return false;
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
