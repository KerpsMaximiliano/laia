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
	| 'add_card'
	| 'add_location_alt'
	| 'add_shopping_cart'
	| 'add'
	| 'arrow_back_ios'
	| 'arrow_circle_right'
	| 'arrow_forward_ios'
	| 'article'
	| 'attach_money'
	| 'calendar_month'
	| 'calendar_today'
	| 'campaignOnePicker'
	| 'cancel'
	| 'chat'
	| 'check_circle'
	| 'checklist'
	| 'close'
	| 'credit_card'
	| 'crop_16_9'
	| 'currency_exchange'
	| 'delete'
	| 'done_all'
	| 'done'
	| 'drag_indicator'
	| 'edit'
	| 'event'
	| 'filter_alt'
	| 'folder'
	| 'forward_to_inbox'
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
	| 'next_plan'
	| 'open_in_new'
	| 'payments'
	| 'person_add'
	| 'person'
	| 'picture_as_pdf'
	| 'preview_off'
	| 'preview'
	| 'public'
	| 'qr_code'
	| 'radio_button_unchecked'
	| 'redeem'
	| 'remove'
	| 'schedule'
	| 'settings'
	| 'share_location'
	| 'share'
	| 'shopping_cart'
	| 'sticky_note_2'
	| 'store'
	| 'storefront'
	| 'sync'
	| 'wysiwyg';
