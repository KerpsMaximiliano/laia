import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-library-menu',
	standalone: true,
	imports: [],
	templateUrl: './library-menu.component.html',
	styleUrl: './library-menu.component.scss'
})
export class LibraryMenuComponent {}
