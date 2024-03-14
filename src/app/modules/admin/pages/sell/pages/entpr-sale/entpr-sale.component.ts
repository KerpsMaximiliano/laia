import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// * Services.
import { SellService } from '@sell/services/sell.service';

// * Material.
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { LoginComponent } from '@components/login/login.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-entprsale',
	standalone: true,
	imports: [ButtonComponent, LoginComponent, MatSlideToggleModule, MatExpansionModule],
	templateUrl: './entpr-sale.component.html',
	styleUrl: './entpr-sale.component.scss'
})
export class EntprSaleComponent {
	public panelOpenState: boolean = false;
	public readonly options: {
		title: string;
		subtitle: string;
		expand?: boolean;
		header?: string;
		content?: string;
		icon?: string;
		redirect?: string;
	}[][] = [
		[
			{
				header: 'Tiempo de entrega',
				redirect: 'delivery-time',
				title: 'Por Activar',
				subtitle: 'Adiciona una tanda.'
			}
		],
		[
			{
				header: 'Lugares de entrega',
				redirect: 'delivery-location',
				icon: 'truck',
				title: 'Por Activar',
				subtitle: 'Adiciona una Distancia'
			}
		],
		[
			{
				expand: true,
				header: 'Métodos de pago',
				title: 'Por activar',
				subtitle: 'Adiciona un método'
			}
		],
		[
			{
				header: 'Dedicatoria de regalo',
				title: 'Opcional al comprador',
				subtitle: 'Virtual',
				content: 'Texto en tarjeta. QR para multimedia'
			},
			{
				header: 'Dedicatoria de regalo',
				title: 'Opcional al comprador',
				subtitle: 'Tradicional',
				content: 'Texto en tarjeta. QR para multimedia'
			}
		],
		[
			{
				header: 'Confirmación de la factura',
				title: 'Activo',
				subtitle: 'Adiciona WhatsApp o Email'
			}
		],
		[
			{
				header: 'Personalizacion',
				icon: 'public',
				title: 'Moneda del Pais',
				subtitle: 'Configura la moneda de los pagos',
				content: 'Tipo de moneda. Ubicación geográfica'
			},
			{
				icon: 'imagesearch_roller',
				title: 'Próximamente',
				subtitle: 'Color de la tienda',
				content: 'Por defecto'
			}
		]
	];

	private readonly _sell: SellService = inject(SellService);

	public redirect(value: string): void {
		if (!value) return;
		this._sell.redirect(value);
	}
}
