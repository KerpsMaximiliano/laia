import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Services.
import { CoreService } from '@services/core.service';

// * Material.
import { MatExpansionModule } from '@angular/material/expansion';

// !AUX
// * Mock.
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataResponse, data } from './mock';

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
	public data: DataResponse = data;

	// Metodo que retorna el total de los elementos(Todos los checkeados). En caso de requerir todos y no solamente los checkeados, quitar el if.
	public calcTotal(data: { id: string; sales: number; check: number }[]): number {
		let total: number = 0;
		for (const item of data) {
			if (item.check === 1) {
				total = total + item.sales;
			}
		}
		return total;
	}
}
