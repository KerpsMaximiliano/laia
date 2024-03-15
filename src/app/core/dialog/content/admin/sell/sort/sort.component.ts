import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../../../../components/button/button.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-sort',
	standalone: true,
	imports: [ButtonComponent],
	templateUrl: './sort.component.html',
	styleUrl: './sort.component.scss'
})
export class SortComponent {
	public options: { title: string; value: boolean }[] = [
		{
			title: 'Más reciente',
			value: false
		},
		{
			title: 'Más caro',
			value: false
		},
		{
			title: 'Más vendido',
			value: false
		},
		{
			title: 'Más cantidad',
			value: false
		}
	];
}

// NEW,
// OLD,
// EXPENSIVE,
// CHEAP,
// BESTSELLER,
// LESSSOLD,
// MAXQUANTITY,
// MINQUANTITY
// ? STOCKPACKAGE
// ? STOCKUNIT

// 0 ascendiente
// 1 descendiente
