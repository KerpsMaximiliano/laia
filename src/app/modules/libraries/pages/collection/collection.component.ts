import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-library-collection',
	standalone: true,
	imports: [],
	templateUrl: './collection.component.html',
	styleUrl: './collection.component.scss'
})
export class CollectionComponent {}
