import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Services.
import { CoreService } from '@services/core.service';
import { IConfig, data } from './library-menu.interface';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-library-menu',
	standalone: true,
	imports: [ButtonComponent],
	templateUrl: './library-menu.component.html',
	styleUrl: './library-menu.component.scss'
})
export class LibraryMenuComponent {
	public core: CoreService = inject(CoreService);

	// !AUX
	public data: IConfig = data;
	public edit: boolean = false;

	public action(value: string | null, index: number, action?: 'ORDER' | 'REDIRECT' | null): void {
		if (!action) return;
		switch (action) {
			case 'REDIRECT':
				// sell.redirect(value)
				console.log('REDIRECCION');
				break;
			case 'ORDER':
				this.data.items[index].action.value = value === 'asc' ? 'desc' : 'asc';
				break;
		}
	}
}
