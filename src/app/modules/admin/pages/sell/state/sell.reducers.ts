import { createReducer, on } from '@ngrx/store';

// * STATE - Const.
import { ADMIN_SELL_STATE } from './sell.state';

// * Consts.
import { COMPLETE, LOADED, UPDATING } from '@consts/load.const';
import { ARTICLE } from '@sell/state/sell.state';

// * Interfaces.
import { ISell } from '@sell/interfaces/sell.interface';

// * Actions.
import {
	ADMIN_SELL_ARTICLES_LOAD,
	ADMIN_SELL_ARTICLES_LOADED,
	ADMIN_SELL_ARTICLE_CREATE,
	ADMIN_SELL_ARTICLE_CREATED
} from './sell.actions';

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
	}),
	on(ADMIN_SELL_ARTICLE_CREATE, (state): ISell => {
		return { ...state, article: { ...state.article, status: UPDATING } };
	}),
	on(ADMIN_SELL_ARTICLE_CREATED, (state, { id, title, price, stock, medias }): ISell => {
		return {
			articles: {
				status: COMPLETE,
				items: [...state.articles.items, { status: COMPLETE, data: { ...state.article.data, id, medias, title, price, stock } }]
			},
			article: ARTICLE
		};
	})
);
