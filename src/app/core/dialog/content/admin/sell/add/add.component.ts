import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Services.
import { CoreService } from '@services/core.service';

// * Material.
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-dialog-content-add',
	standalone: true,
	imports: [ButtonComponent],
	templateUrl: './add.component.html',
	styleUrl: './add.component.scss'
})
export class AddComponent {
	private readonly _core: CoreService = inject(CoreService);
	private readonly _ref: MatDialogRef<AddComponent> = inject(MatDialogRef);

	public redirect(type?: string): void {
		if (type) {
			switch (type) {
				case 'ARTICLE':
					this._core.redirect('admin/sell/article');
					break;
				case 'ORDER':
					this._core.redirect('admin/sell/order');
					break;
				case 'BUYER':
					// this.core.redirect('admin/sell/buyer');
					console.log('Ingresar ruta => AddComponent');
					break;
			}
		}

		this._ref.close();
	}
}
