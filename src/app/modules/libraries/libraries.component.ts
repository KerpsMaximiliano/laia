import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// * Services.
import { LibrariesService } from './services/libraries.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-libraries',
	standalone: true,
	imports: [RouterOutlet],
	template: '<router-outlet />',
	providers: [LibrariesService]
})
export class LibrariesComponent {}
