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
	| 'attach_money'
	| 'calendar_month'
	| 'cancel'
	| 'checklist'
	| 'close'
	| 'credit_card'
	| 'crop_16_9'
	| 'delete'
	| 'done_all'
	| 'done'
	| 'drag_indicator'
	| 'edit'
	| 'filter_alt'
	| 'folder'
	| 'groups'
	| 'image'
	| 'imagesearch_roller'
	| 'info'
	| 'link'
	| 'local_shipping'
	| 'location_on'
	| 'lock_open'
	| 'logout'
	| 'mail'
	| 'map'
	| 'menu'
	| 'mic'
	| 'more_vert'
	| 'navigate_before'
	| 'navigate_next'
	| 'open_in_new'
	| 'person'
	| 'picture_as_pdf'
	| 'preview_off'
	| 'preview'
	| 'public'
	| 'qr_code'
	| 'remove'
	| 'schedule'
	| 'settings'
	| 'share'
	| 'shopping_cart'
	| 'store'
	| 'storefront'
	| 'sync'
	| 'wysiwyg';
