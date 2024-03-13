import { ChangeDetectionStrategy, Component } from '@angular/core';

// * Material.
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { LoginComponent } from '@components/login/login.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-entprsale',
	standalone: true,
	imports: [ButtonComponent, LoginComponent, MatSlideToggleModule],
	templateUrl: './entpr-sale.component.html',
	styleUrl: './entpr-sale.component.scss'
})
export class EntprSaleComponent {
	public readonly options: { title: string; subtitle: string; header?: string; content?: string }[][] = [
		[
			{
				header: 'Entregas',
				title: 'Tiempo de Entregas',
				subtitle: 'Tus clientes seleccionan cuando recibir su compra.',
				content: 'Configura tandas según tu conveniencia'
			},
			{
				title: 'Lugares de Entregas',
				subtitle: 'Según la distancia',
				content: 'Por delivery, pickup o ambas.'
			},
			{
				title: 'Para compradores particulares',
				subtitle: '4 Métodos en uso'
			},
			{
				title: 'Opcional al Comprador',
				subtitle: 'Dedicatoria de Regalo',
				content: 'Texto en tarjeta. QR para multimedia.'
			}
		],
		[
			{
				header: 'Metodos de pago',
				title: 'Para todos los compradores',
				subtitle: '3 Métodos en uso'
			},
			{
				title: 'Para compradores particulares',
				subtitle: '4 Métodos en uso'
			}
		],
		[
			{
				header: 'Personalizacion',
				title: 'Confirmación de la factura',
				subtitle: 'Por WhatsApp',
				content: '(000) 000 - 0000'
			},
			{
				title: 'Moneda del Pais',
				subtitle: 'Configura la moneda de los pagos',
				content: 'Tipo de moneda. Ubicación geográfica'
			},
			{
				title: 'Próximamente',
				subtitle: 'Color de la tienda',
				content: 'Por defecto'
			}
		]
	];

	public action(action: number): void {
		switch (action) {
			case 0:
				// this.sell.redirect('sell/article');
				break;
		}
	}
}
