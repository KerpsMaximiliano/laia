import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';

// * Services.

// * Components.
import { MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '@components/button/button.component';
import { LoadingComponent } from '@components/loading/loading.component';
import { CoreService } from '../../../../../services/core.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-dialog-content-payment',
	standalone: true,
	imports: [ButtonComponent, LoadingComponent],
	templateUrl: './payment.component.html',
	styleUrl: './payment.component.scss'
})
export class PaymentComponent {
	// eslint-disable-next-line @typescript-eslint/naming-convention, @angular-eslint/no-output-native
	@Output() private readonly close: EventEmitter<void> = new EventEmitter<void>();
	public readonly payments: { title: string; subtitle: string; redirect: string }[] = [
		{
			title: 'Adiciona el banco y la cuenta',
			subtitle:
				'El comprador sube una imagen(screenshot) para evidenciar el pago que hizo en el banco y cuenta que asignaste y tu lo confirmas.',
			redirect: 'admin/sell/wire-transfer'
		},
		{
			title: 'Adiciona los Días de Crédito',
			subtitle:
				'Con esta opción, tus clientes pueden comprar ahora y pagar más tarde. Elige los dias de plazo que les otorgarás para realizar el pago.',
			redirect: 'admin/sell/credit-days'
		},
		{
			title: 'PayPal: Correo Electrónico',
			subtitle: 'Configura la opción y permite que tus clientes su cuenta de PayPal.',
			redirect: 'admin/sell/paypal'
		},
		{
			title: 'Zelle: Correo Electrónico',
			subtitle: 'Disponible para todos los compradores.',
			redirect: ''
		},
		{
			title: 'Adiciona el banco y la cuenta',
			subtitle: 'Disponible para todos los compradores.',
			redirect: ''
		},
		{
			title: 'Adiciona el banco y la cuenta',
			subtitle: 'Disponible para todos los compradores.',
			redirect: ''
		},
		{
			title: 'Adiciona el banco y la cuenta',
			subtitle: 'Disponible para todos los compradores.',
			redirect: ''
		}
	];
	private readonly _core: CoreService = inject(CoreService);
	private readonly _ref: MatDialogRef<PaymentComponent> = inject(MatDialogRef);

	public redirect(value: string): void {
		console.log(value);

		if (!value) return;

		this.close.emit();
		setTimeout(() => {
			this._core.redirect(value);
		}, 400);
	}
}
