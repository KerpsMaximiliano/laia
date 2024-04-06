import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// * Services.
import { CollectionsService } from '@common/services/collections.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-common-collections',
	standalone: true,
	imports: [RouterOutlet],
	template: '<router-outlet />',
	providers: [CollectionsService]
})
export class CollectionsComponent {}
