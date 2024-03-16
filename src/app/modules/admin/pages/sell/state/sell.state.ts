// * Consts.
import { INITIAL, LOADED } from '@app/core/constants/load.const';

// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';
import { IArticle, ISell } from '@sell/interfaces/sell.interface';

// * ADMIN SELL INITIAL ARTICLE.
export const article: ILoadableEntity<IArticle> = {
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
		commissions: 0,
		categories: {
			status: LOADED,
			count: 0,
			items: []
		},
		hashtag: null,
		keywords: {
			status: LOADED,
			count: 0,
			items: []
		},
		manufacturing: {
			time: null,
			type: 'MINUTE'
		},
		questions: {
			status: LOADED,
			count: 0,
			items: []
		},
		segments: {
			status: LOADED,
			count: 0,
			items: []
		}
	}
};

// * ADMIN SELL INITIAL STATE.
export const ADMIN_SELL_STATE: ISell = {
	articles: {
		status: INITIAL,
		// items: [article]
		items: []
	}
};
