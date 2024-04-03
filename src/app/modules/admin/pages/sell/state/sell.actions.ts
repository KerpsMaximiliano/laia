import { createAction, props } from '@ngrx/store';

// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';
import { IArticle } from '@sell/interfaces/sell.interface';

// * CREATE ARTICLE.
export const ADMIN_SELL_ARTICLE_CREATE = createAction(
	'[Admin Sell Article] Create Article',
	props<{
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		medias: any[];

		title: string | null;

		price: number | null;
		tPrice: 'USD';

		stock: number | null;
		tStock: 'PACKAGE' | 'UNIT';

		manufacturing: number | null;
		tManufacturing: 'DAY' | 'HOUR' | 'MINUTE' | 'MONTH';

		hashtag: string | null;

		keywords: string[];

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		segmentMedia?: any;
		segmentTitle: string | null;
		segmentDescription: string | null;

		question: string | null;
		questionType: 'CALENDAR' | 'MULTIPLE' | 'TEXT' | 'TIME';
		questionRequired: number;
		questionLimit: number;
		questionOptions: string[];
	}>()
);
export const ADMIN_SELL_ARTICLE_CREATED = createAction(
	'[Admin Sell Article] Created Article',
	props<{
		id: number;
		medias: IArticle['medias'];
		title: IArticle['title'];
		price: IArticle['price'];
		stock: IArticle['stock'];
		segmentMedia: IArticle['segments']['items'][number]['media'];
	}>()
);

// * ASSIGN ARTICLE.
export const ADMIN_SELL_ARTICLE_ASSIGN = createAction('[Admin Sell Article] Assign Article', props<{ article: number }>());

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
