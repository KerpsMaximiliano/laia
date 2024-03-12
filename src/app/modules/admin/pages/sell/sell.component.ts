import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// * Services.
import { SellService } from '@sell/services/sell.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell',
	standalone: true,
	imports: [RouterOutlet],
	template: '<router-outlet />',
	providers: [SellService]
})
export class SellComponent {}
