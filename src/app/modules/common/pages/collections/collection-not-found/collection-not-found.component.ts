import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LibrariesService } from '../../../services/libraries.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-common-collection-not-found',
	standalone: true,
	imports: [],
	templateUrl: './collection-not-found.component.html',
	styleUrl: './collection-not-found.component.scss'
})
export class CollectionNotFoundComponent {
	private readonly _libraries: LibrariesService = inject(LibrariesService);

	public redirect(action: 'CONTACT' | 'ERROR' | 'HOME' | 'LIBRARY'): void {
		switch (action) {
			case 'CONTACT':
				console.log('contact');
				return;
			case 'ERROR':
				console.log('error');
				return;
			case 'HOME':
				console.log('home');
				return;
			case 'LIBRARY':
				this._libraries.redirect('HOME');
				return;
		}
	}
}
