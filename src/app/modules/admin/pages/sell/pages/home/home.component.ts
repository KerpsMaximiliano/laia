import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';

// * Components.
import { ButtonComponent } from '@components/button/button.component';
import { LoginComponent } from '@components/login/login.component';

// * Conts.
import { COMPLETE } from '@consts/load.const';

// * Interfaces.
import { IState } from '@interfaces/state.interface';
import { ILogin } from '@user/interfaces/user.interface';

// * Services.
import { SellService } from '@sell/services/sell.service';
import { CoreService } from '@services/core.service';

// * Sorts.
import { ILoading } from '@sorts/loading.sort';

// * Selectors.
import { selectLogin } from '@user/state/user.selectors';

// * Material.
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-home',
	standalone: true,
	imports: [ButtonComponent, LoginComponent, MatExpansionModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public readonly COMPLETE: ILoading = COMPLETE;
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

	public readonly entrepreneur: { title: string; description: string; status: boolean }[] = [
		{
			title: 'Perfil *',
			description: 'Déjale saber a tus compradores la información más importante de tu negocio.',
			status: true
		},
		{
			title: 'Ventas *',
			description: 'Configura los parámetros de tus entregas, donde te pagarán y el WhatsApp para que te confirmen su compra.',
			status: true
		},
		{
			title: 'Categorias',
			description: 'Agrupa y presenta artículos en tu tienda para guiar a tus compradores.',
			status: true
		},
		{
			title: 'Incentivos',
			description: 'Incentiva a tu personal interno con una de 3 comisionesp ara que vendas más.',
			status: false
		},
		{
			title: 'Catálogos',
			description: 'Créalos con precios ajustables como playlists para aumentar tu alcance y visibilidad a cambio de comisiones.',
			status: false
		},
		{
			title: 'Tendencias según tus ventas LAIA',
			description: 'ID',
			status: false
		},
		{
			title: 'Preguntas a Compradores',
			description: 'Para obtener un feedback de tus clientes.',
			status: false
		}
	];
	public panelOpenState: boolean = true;

	// eslint-disable-next-line @ngrx/use-consistent-global-store-name
	private readonly _store: Store<IState> = inject(Store);

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly user: Signal<ILogin> = this._store.selectSignal(selectLogin);

	public action(action: number): void {
		switch (action) {
			case 0:
				// this.sell.redirect('sell/article');
				break;
		}
	}
}
