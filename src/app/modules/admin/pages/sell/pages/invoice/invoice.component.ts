import { ChangeDetectionStrategy, Component } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Pipes.
import { currency } from '@pipes/currency.pipe';

// * Sorts.
import { ILoading } from '@sorts/loading.sort';

// * Material.
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-invoice',
	standalone: true,
	imports: [MatExpansionModule, ButtonComponent],
	templateUrl: './invoice.component.html',
	styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {
	public readonly currency: (value: number | null | undefined) => string = currency;

	public user: {
		id: number;
		email: string;
		image: string | null;
		name: string | null;
		surname: string | null;
		phone: string | null;
	} = {
		id: 1,
		email: 'maximilianokerps@gmail.com',
		// image: 'https://avatars.githubusercontent.com/u/25936678?v=4',
		image: null,
		// name: 'Maximiliano',
		name: null,
		// surname: 'Kerps',
		surname: null,
		phone: '+5493434047556'
		// phone: null
	};

	public articles: {
		status: ILoading;
		items: {
			media: string | null;
			title: string | null;
			price: number | null;
			stock: { quantity: number; type: 'PACKAGE' | 'UNIT' };
		}[];
		count: number;
		total: number;
	} = {
		status: 'LOADING',
		items: [
			{
				media: 'https://avatars.githubusercontent.com/u/25936678?v=4',
				title: 'Article 1',
				price: 100,
				stock: { quantity: 1, type: 'UNIT' }
			},
			{
				media: 'https://avatars.githubusercontent.com/u/25936678?v=4',
				title: 'Article 2',
				price: 200,
				stock: { quantity: 2, type: 'UNIT' }
			},
			{
				media: 'https://avatars.githubusercontent.com/u/25936678?v=4',
				title: 'Article 3',
				price: 300,
				stock: { quantity: 3, type: 'UNIT' }
			},
			{
				media: 'https://avatars.githubusercontent.com/u/25936678?v=4',
				title: 'Article 4',
				price: 300,
				stock: { quantity: 3, type: 'PACKAGE' }
			},
			{
				media: 'https://avatars.githubusercontent.com/u/25936678?v=4',
				title: 'Article 5',
				price: 300,
				stock: { quantity: 1, type: 'PACKAGE' }
			}
		],
		count: 0,
		total: 0
	};
}
