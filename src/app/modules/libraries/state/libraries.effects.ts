import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

// * Env.
import { environment } from '@env/environment';

// * Consts.
import { LOADED, LOADING } from '@consts/load.const';

// * Interfaces.

// * Services.
import { CoreService } from '@services/core.service';

import { ILoading } from '@sorts/loading.sort';

// * Actions.

// * Graphql.

@Injectable({ providedIn: 'root' })
export class SellEffects {
	private readonly _actions$: Actions = inject(Actions);
	private readonly _core: CoreService = inject(CoreService);
	private readonly _loaded: ILoading = LOADED;
	private readonly _loading: ILoading = LOADING;
	private readonly _api: string = environment.api;

	// ! ARTICLES.
	// eslint-disable-next-line @typescript-eslint/member-ordering
}
