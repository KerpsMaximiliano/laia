// * Consts.
import { INITIAL, LOADED } from '@app/core/constants/load.const';

// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';
import { IArticle, ISell } from '@sell/interfaces/sell.interface';

// * ADMIN SELL INITIAL ARTICLE.
export const ARTICLE: ILoadableEntity<IArticle> = {
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
		investments: {
			status: LOADED,
			items: [
				{
					id: 0,
					amount: null,
					title: null,
					note: null
				}
			],
			total: 0
		},
		commissions: {
			status: LOADED,
			items: [
				{
					id: 0,
					amount: null,
					type: 'AMOUNT'
				}
			],
			total: 0
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
			items: [
				{
					id: 0,
					question: null,
					type: 'TEXT',
					limit: 0,
					required: 0,
					options: []
				}
			]
		},
		segments: {
			status: LOADED,
			count: 0,
			items: [
				{
					id: 0,
					title: null,
					description: null,
					media: null
				}
			]
		}
	}
};

// * ADMIN SELL INITIAL STATE.
export const ADMIN_SELL_STATE: ISell = {
	articles: {
		status: INITIAL,
		items: []
	},
	article: ARTICLE
};
