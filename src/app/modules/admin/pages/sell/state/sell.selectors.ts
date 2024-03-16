import { MemoizedSelector, createSelector } from '@ngrx/store';

// * STATE - Const.
import { STATE } from '@consts/state.const';

// * Consts.

// * Interfaces.
import { ILoadableEntities, ILoadableEntity } from '@interfaces/load.interface';
import { IState } from '@interfaces/state.interface';
import { IArt, IArticle } from '@sell/interfaces/sell.interface';

// * ARTICLES.
export const selectAdminSellArticles = (state: IState): ILoadableEntities<IArt> => {
	return {
		status: state.admin.sell.articles.status,
		items: state.admin.sell.articles.items.map((article: ILoadableEntity<IArticle>) => {
			const { id, title, medias, price, stock } = article.data;
			const media: { url: string; type: 'IMAGE' | 'VIDEO' } | null = medias && medias.length > 0 ? medias[0] : null;
			return { id, title, media, price, stock };
		})
	};
};

// * ARTICLE.
export const selectAdminSellArt = (id: number): MemoizedSelector<IState, ILoadableEntity<IArticle>> =>
	createSelector(STATE, (state: IState): ILoadableEntity<IArticle> => {
		if (id === 0) return state.admin.sell.articles.items[0];

		const index: number = state.admin.sell.articles.items.findIndex((article: ILoadableEntity<IArticle>) => article.data.id === id);

		if (index === -1) return state.admin.sell.articles.items[0];

		const articles: ILoadableEntity<IArticle>[] = [...state.admin.sell.articles.items];

		return articles[index];
	});
