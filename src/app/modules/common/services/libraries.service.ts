import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// * Functions.
import { id } from '@functions/id.function';

// * View.
import { LibrariesComponent } from '@common/views/libraries.component';

@Injectable({ providedIn: LibrariesComponent })
export class LibrariesService {
	private readonly _router: Router = inject(Router);
	private readonly _route: ActivatedRoute = inject(ActivatedRoute);
	private readonly _id: (id: string | undefined) => number = id;

	public redirect(url: string, id?: number | string): void {
		if (id) {
			void this._router.navigate([`${url}/${id}`], { relativeTo: this._route });
			return;
		} else {
			void this._router.navigate([url], { relativeTo: this._route });
			return;
		}
	}

	public id(): number {
		return this._id(this._route.snapshot.params['library']);
	}
}
