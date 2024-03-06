import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-negotation',
	standalone: true,
	imports: [RouterOutlet],
	template: '<router-outlet />'
})
export class NegotationComponent {}
