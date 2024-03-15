import { createAction, props } from '@ngrx/store';

// * Interfaces.
import { IArticle } from '@sell/interfaces/sell.interface';

// ? CREATE ARTICLE.
export const ADMIN_SELL_ARTICLE_CREATE = createAction(
	'[Admin Sell Article] Create Article',
	props<{ article: IArticle }>()
);
export const ADMIN_SELL_ARTICLE_CREATED = createAction(
	'[Admin Sell Article] Created Article',
	props<{ article: IArticle }>()
);

// * LOAD ARTICLE.
// export const ADMIN_SELL_ARTICLE_LOAD = createAction('[Admin Sell Article] Load Article', props<{ id: number }>());
// export const ADMIN_SELL_ARTICLE_SUCCESS = createAction(
// 	'[Admin Sell Article] Success Article',
// 	props<{ art: IArticle }>()
// );

// // * LOAD ARTICLE HASHTAG.
// export const ADMIN_SELL_ARTICLE_HASHTAG_LOAD = createAction(
// 	'[Admin Sell Article Hashtag] Load Article Hashtag',
// 	props<{ id: number }>()
// );
// export const ADMIN_SELL_ARTICLE_HASHTAG_SUCCESS = createAction(
// 	'[Admin Sell Article Hashtag] Success Article Hashtag',
// 	props<{ hashtag: string }>()
// );
// export const ADMIN_SELL_ARTICLE_HASHTAG_FAILED = createAction('[Admin Sell Article Hashtag] Failed Article Hashtag');

// // * CHECK ARTICLE HASHTAG.
// export const ADMIN_SELL_ARTICLE_HASHTAG_CHECK = createAction(
// 	'[Admin Sell Article Hashtag] Check Article Hashtag',
// 	props<{ hashtag: string; merchant: number }>()
// );
// export const ADMIN_SELL_ARTICLE_HASHTAG_CHECKED = createAction('[Admin Sell Article Hashtag] Checked Article Hashtag');

// // * UPDATE ARTICLE HASHTAG.
// export const ADMIN_SELL_ARTICLE_HASHTAG_UPDATE = createAction(
// 	'[Admin Sell Article Hashtag] Update Article Hashtag',
// 	props<{ id: number; hashtag: string | null }>()
// );
// export const ADMIN_SELL_ARTICLE_HASHTAG_UPDATED = createAction(
// 	'[Admin Sell Article Hashtag] Updated Article Hashtag',
// 	props<{ id: number; hashtag: string | null }>()
// );
