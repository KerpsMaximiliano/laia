import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { LoginComponent } from '@components/login/login.component';

// * Services.
import { SellService } from '@sell/services/sell.service';
import { CoreService } from '@services/core.service';

// * Sorts.

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-home',
	standalone: true,
	imports: [ButtonComponent, LoginComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
	public readonly core: CoreService = inject(CoreService);
	public readonly sell: SellService = inject(SellService);
	public readonly options: { title: string; sell: string }[] = [
		{
			title: 'Breeders',
			sell: 'Wisky'
		},
		{
			title: 'Fincas',
			sell: 'Vino'
		},
		{
			title: 'Mayoristas, Importadores',
			sell: 'All products'
		},
		{
			title: 'Floristerias',
			sell: 'Flores'
		},
		{
			title: 'Decoradores de eventos',
			sell: 'Decoraciones'
		}
	];

	public action(action: number): void {
		switch (action) {
			case 0:
				// this.sell.redirect('sell/article');
				break;
		}
	}
}
