import { createReducer, on } from '@ngrx/store';

// * STATE - Const.
import { ADMIN_SELL_STATE } from './sell.state';

// * Consts.
import { LOADED } from '@consts/load.const';

// * Interfaces.
import { ISell } from '@sell/interfaces/sell.interface';

// * Actions.
import { ADMIN_SELL_ARTICLES_LOAD, ADMIN_SELL_ARTICLES_LOADED } from './sell.actions';

export const ADMIN_SELL_REDUCERS = createReducer(
	// * INITIAL STATE.
	ADMIN_SELL_STATE,
	on(ADMIN_SELL_ARTICLES_LOAD, (state): ISell => state),
	on(ADMIN_SELL_ARTICLES_LOADED, (state, { articles }): ISell => {
		return {
			...state,
			articles: {
				status: LOADED,
				items: [...state.articles.items, ...articles]
			}
		};
	})
);
