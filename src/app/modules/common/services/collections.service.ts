import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// * Functions.
import { id } from '@functions/id.function';

// * View.
import { CollectionsComponent } from '@common/views/collections.component';

@Injectable({ providedIn: CollectionsComponent })
export class CollectionsService {
	private readonly _router: Router = inject(Router);
	private readonly _route: ActivatedRoute = inject(ActivatedRoute);
	private readonly _id: (id: string | undefined) => number = id;

	public redirect(action: 'ERROR' | 'FILTER' | 'HOME' | 'MENU' | 'MINIATURES' | 'ORDER'): void {
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
			case 'ERROR':
				void this._router.navigate(['not-found'], { relativeTo: this._route });
				return;
			case 'FILTER':
				void this._router.navigate(['filter'], { relativeTo: this._route });
				return;
			case 'ORDER':
				void this._router.navigate(['ordering'], { relativeTo: this._route });
				return;
		}
	}

	public collection(): number | null {
		const collection: number = this._id(this._route.snapshot.params['collection']);

		if (collection < 1) {
			this.redirect('ERROR');
			return null;
		}

		return collection;
	}
}
