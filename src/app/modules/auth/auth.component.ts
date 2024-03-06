import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-auth',
	standalone: true,
	imports: [RouterOutlet],
	template: '<router-outlet />'
})
export class AuthComponent {}
