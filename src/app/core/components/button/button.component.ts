import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// * Components.
import { LoadingComponent } from '@components/loading/loading.component';

// * Sorts.
import { Icon } from '@sorts/icon.sort';

// * Material.
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-component-button',
	standalone: true,
	imports: [MatBadgeModule, MatIconModule, LoadingComponent],
	templateUrl: './button.component.html',
	styleUrl: './button.component.scss'
})
export class ButtonComponent {
	@Input() public type?: Type;
	@Input() public icon?: Icon;
	@Input() public label?: string;
	@Input() public color?: string;
	@Input() public background?: string;
	@Input() public badge?: number;
	@Input() public suffix: boolean = false;
	@Input() public loading: boolean = false;
	@Input() public disabled: boolean = false;
}

type Type = 'ICON' | 'MINI' | 'XR';
