import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-buy',
	standalone: true,
	imports: [RouterOutlet],
	template: '<router-outlet />'
})
export class BuyComponent {}
