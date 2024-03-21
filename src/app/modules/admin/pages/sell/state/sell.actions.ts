import { createAction, props } from '@ngrx/store';

// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';
import { IArticle } from '@sell/interfaces/sell.interface';

// --------------------------------------------------------------------------------------------------------------

// * LOAD ARTICLE.
export const ADMIN_SELL_ARTICLE_LOAD = createAction('[Admin Sell Article] Load Article', props<{ id: number }>());
export const ADMIN_SELL_ARTICLE_LOADED = createAction('[Admin Sell Article] Loaded Article', props<{ article: IArticle }>());

// ? LOAD ARTICLES.
export const ADMIN_SELL_ARTICLES_LOAD = createAction('[Admin Sell Articles] Load Articles', props<{ merchant: number; page?: number }>());
export const ADMIN_SELL_ARTICLES_LOADED = createAction(
	'[Admin Sell Articles] Loaded Articles',
	props<{ articles: ILoadableEntity<IArticle>[] }>()
);

// // ? LOAD ARTICLE.
// export const ADMIN_SELL_ARTICLE_LOAD = createAction('[Admin Sell Article] Load Article', props<{ id: number }>());
// export const ADMIN_SELL_ARTICLE_LOADED = createAction('[Admin Sell Article] Loaded Article', props<{ article: IArticle }>());

// // ? CREATE ARTICLE.
// export const ADMIN_SELL_ARTICLE_CREATE = createAction('[Admin Sell Article] Create Article', props<{ article: IArticle }>());
// export const ADMIN_SELL_ARTICLE_CREATED = createAction('[Admin Sell Article] Created Article', props<{ article: IArticle }>());
