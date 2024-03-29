import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Services.
import { CoreService } from '@services/core.service';

// * Material.
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-order',
	standalone: true,
	imports: [MatExpansionModule, ButtonComponent],
	templateUrl: './order.component.html',
	styleUrl: './order.component.scss'
})
export class OrderComponent {
	public readonly core: CoreService = inject(CoreService);

	public readonly view: 'ADMIN' | 'USER' = 'ADMIN';

	public user: {
		id: number;
		email: string;
		image: string | null;
		name: string | null;
		surname: string | null;
		phone: string | null;
	} | null = {
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

	public merchant: {
		id: number;
		email: string;
		image: string | null;
		name: string | null;
		surname: string | null;
		phone: string | null;
	} = {
		id: 1,
		email: 'maximilianokerps@gmail.com',
		image: 'https://avatars.githubusercontent.com/u/25936678?v=4',
		// image: null,
		// name: 'Maximiliano',
		name: null,
		surname: 'Kerps',
		// surname: null,
		phone: '+5493434047556'
		// phone: null
	};
}
