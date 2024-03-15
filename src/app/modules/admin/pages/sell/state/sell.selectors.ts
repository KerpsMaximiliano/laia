import { MemoizedSelector, createSelector } from '@ngrx/store';

// * STATE - Const.
import { STATE } from '@consts/state.const';

// * Consts.

// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';
import { IState } from '@interfaces/state.interface';
import { IArticle } from '@sell/interfaces/sell.interface';

// * ARTICLE.
export const selectAdminSellArt = (id: number): MemoizedSelector<IState, ILoadableEntity<IArticle>> =>
	createSelector(STATE, (state: IState): ILoadableEntity<IArticle> => {
		if (id === 0) return state.admin.sell.articles.items[0];

		const index: number = state.admin.sell.articles.items.findIndex(
			(article: ILoadableEntity<IArticle>) => article.data.id === id
		);

		if (index === -1) return state.admin.sell.articles.items[0];

		const articles: ILoadableEntity<IArticle>[] = [...state.admin.sell.articles.items];

		return articles[index];
	});
