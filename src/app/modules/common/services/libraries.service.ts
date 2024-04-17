import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// * Functions.
import { id } from '@functions/id.function';

// * Services.
import { CoreService } from '@services/core.service';

// * Sorts.
import { TLibraries } from '@common/sorts/common.sort';

// * View.
import { LibrariesComponent } from '@common/views/libraries.component';

@Injectable({ providedIn: LibrariesComponent })
export class LibrariesService {
	private readonly _router: Router = inject(Router);
	private readonly _route: ActivatedRoute = inject(ActivatedRoute);
	private readonly _id: (id: string | undefined) => number = id;
	private readonly _core: CoreService = inject(CoreService);

	public redirect(action: 'BACK' | 'COLLECTION' | 'ERROR' | 'HOME' | 'MENU' | 'MINIATURES', id?: number): void {
		switch (action) {
			case 'HOME':
				void this._router.navigate(['home'], { relativeTo: this._route });
				return;
			case 'MENU':
				void this._router.navigate(['menu'], { relativeTo: this._route });
				return;
			case 'MINIATURES':
				void this._router.navigate(['miniatures'], { relativeTo: this._route });
				return;
			case 'COLLECTION':
				void this._router.navigate([`collection/${id}/home`], { relativeTo: this._route });
				return;
			case 'ERROR':
				return;
			case 'BACK':
				if (this._core.previous) {
					this._core.back();
				}
				return;
		}
	}

	public library(): number | null {
		const library: number = this._id(this._route.snapshot.params['library']);

		if (library < 1) {
			this.redirect('ERROR');
			return null;
		}

		return library;
	}

	public tLibrary(): TLibraries | null {
		const param: string | undefined = this._route.snapshot.params['tLibrary'];

		if (!param) return null;

		const key: TLibraries = param as TLibraries;

		switch (key) {
			case 'buyers':
				return 'buyers';
			default:
				return null;
		}
	}
}
