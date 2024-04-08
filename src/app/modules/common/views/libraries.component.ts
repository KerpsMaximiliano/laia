import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// * Services.
import { LibrariesService } from '@common/services/libraries.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-common-libraries',
	standalone: true,
	imports: [RouterOutlet],
	template: '<router-outlet />',
	providers: [LibrariesService]
})
export class LibrariesComponent {}
