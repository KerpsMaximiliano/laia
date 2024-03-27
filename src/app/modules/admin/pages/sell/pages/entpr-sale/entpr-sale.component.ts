import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { LoginComponent } from '@components/login/login.component';

// * Services.
import { SellService } from '@sell/services/sell.service';
import { CoreService } from '@services/core.service';

// * Sorts.
import { IDays } from '@sorts/calendar.sort';

// * Material.
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-entprsale',
	standalone: true,
	imports: [MatSlideToggleModule, MatExpansionModule, ButtonComponent, LoginComponent],
	templateUrl: './entpr-sale.component.html',
	styleUrl: './entpr-sale.component.scss'
})
export class EntprSaleComponent {
	public panelOpenState: boolean = false;

	public readonly manufacturing: { title: string; from: string; to: string; inDays: IDays }[] = [];
	public readonly addresses: { direction: string; amount: string; range: string }[] = [];
	public readonly payments: { title: string; type: 'ALL' | 'SELECT'; cvu: string; amount: string }[] = [];

	public readonly core: CoreService = inject(CoreService);
	private readonly _sell: SellService = inject(SellService);

	public open(): void {
		this.core.open('PAYMENT');
	}

	public redirect(value: string): void {
		if (!value) return;
		this._sell.redirect(value);
	}
}
