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
		title: 'Producto uno', // null,
		price: {
			amount: 999999.99, // null,
			type: 'USD'
		},
		stock: {
			quantity: 1, // null,
			type: 'UNIT'
		},
		investments: {
			status: LOADED,
			items: [
				{
					id: 0,
					amount: 999999.99, // null,
					title: 'Inversión uno', // null,
					note: 'Nota uno' // null
				}
			],
			total: 0
		},
		commissions: {
			status: LOADED,
			items: [
				{
					id: 0,
					amount: 999999.99, // null,
					type: 'AMOUNT'
				}
			],
			total: 0
		},
		hashtag: 'Hola', // null,
		keywords: {
			status: LOADED,
			count: 1,
			items: ['hola']
		},
		manufacturing: {
			time: 3,
			type: 'DAY'
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
		items: []
	},
	article: article
};
