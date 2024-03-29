import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Services.
import { CoreService } from '@services/core.service';

// * Material.
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-library-menu',
	standalone: true,
	imports: [MatExpansionModule, ButtonComponent],
	templateUrl: './library-menu.component.html',
	styleUrl: './library-menu.component.scss'
})
export class LibraryMenuComponent {
	public readonly core: CoreService = inject(CoreService);
}
