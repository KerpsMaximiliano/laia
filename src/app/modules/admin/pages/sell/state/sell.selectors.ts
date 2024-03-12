import { MemoizedSelector, createSelector } from '@ngrx/store';

// * STATE - Const.
import { STATE } from '@consts/state.const';

// * Consts.
import { FAILED, LOADED, LOADING } from '@consts/load.const';

// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';
import { IState } from '@interfaces/state.interface';
import { IArt, IArticle, ISegment } from '@sell/interfaces/sell.interface';

// * ART.
export const selectAdminSellArt = (id: number): MemoizedSelector<IState, ILoadableEntity<IArt>> =>
	createSelector(STATE, (state: IState): ILoadableEntity<IArt> => {
		const art: ILoadableEntity<IArt> = {
			status: LOADED,
			data: {
				id: 0,
				medias: [],
				title: null,
				price: {
					amount: null,
					type: 'USD'
				},
				stock: {
					quantity: null,
					type: 'UNIT'
				},
				investments: 0,
				commissions: 0
			}
		};

		if (id === 0) return art;

		const index: number = state.admin.sell.articles.items.findIndex(
			(article: ILoadableEntity<IArticle>) => article.data.id === id
		);

		if (index === -1) return art;

		const articles: ILoadableEntity<IArticle>[] = [...state.admin.sell.articles.items];

		const { medias, title, price, stock, investments, commissions } = articles[index].data;
		return {
			status: articles[index].status,
			data: {
				id,
				medias,
				title,
				price,
				stock,
				investments,
				commissions
			}
		};
	});

// ! ERROR
// * ARTICLE HASHTAG.
export const selectAdminSellArticleHashtag = (id: number): MemoizedSelector<IState, ILoadableEntity<string | null>> =>
	createSelector(STATE, (state: IState): ILoadableEntity<string | null> => {
		if (id === 0) return { status: FAILED, data: null };

		const index: number = state.admin.sell.articles.items.findIndex(
			(article: ILoadableEntity<IArticle>) => article.data.id === id
		);

		if (index === -1) return { status: LOADING, data: null };

		return state.admin.sell.articles.items[index].data.hashtag;
	});

// * ARTICLE SEGMENT.
export const selectAdminSellArticleSegment = (id: number, seg: number): MemoizedSelector<IState, ISegment> =>
	createSelector(STATE, (state: IState): ISegment => {
		if (id === 0) return { id: 0, title: null, description: null, media: null };

		const iArticle: number = state.admin.sell.articles.items.findIndex(
			(article: ILoadableEntity<IArticle>) => article.data.id === id
		);

		if (iArticle === -1) return { id: 0, title: null, description: null, media: null };

		const iSegment: number = state.admin.sell.articles.items[iArticle].data.segments.items.findIndex(
			(segment: ISegment) => segment.id === seg
		);

		if (iSegment === -1) return { id: 0, title: null, description: null, media: null };

		return state.admin.sell.articles.items[iArticle].data.segments.items[iSegment];
	});
