import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// * Components.
import { LoadingComponent } from '@components/loading/loading.component';

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
type Icon =
	| 'abc'
	| 'add'
	| 'arrow_back_ios'
	| 'arrow_circle_right'
	| 'arrow_forward_ios'
	| 'calendar_month'
	| 'checklist'
	| 'close'
	| 'crop_16_9'
	| 'delete'
	| 'done_all'
	| 'done'
	| 'edit'
	| 'image'
	| 'info'
	| 'link'
	| 'local_shipping'
	| 'location_on'
	| 'lock_open'
	| 'logout'
	| 'menu'
	| 'mic'
	| 'more_vert'
	| 'navigate_before'
	| 'navigate_next'
	| 'open_in_new'
	| 'person'
	| 'preview_off'
	| 'preview'
	| 'qr_code'
	| 'remove'
	| 'schedule'
	| 'settings'
	| 'share'
	| 'shopping_cart'
	| 'store'
	| 'sync'
	| 'wysiwyg';
