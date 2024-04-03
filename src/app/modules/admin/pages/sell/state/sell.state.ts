// * Consts.
import { INITIAL, LOADED } from '@consts/load.const';

// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';
import { IArticle } from '@sell/interfaces/sell-article.interface';
import { ISell } from '@sell/interfaces/sell.interface';
import { IOrder } from '../interfaces/sell-order.interface';

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

// * ADMIN SELL INITIAL ARTICLE.
export const ORDER: ILoadableEntity<IOrder> = {
	status: INITIAL,
	data: {
		user: {
			id: null,
			image: null,
			email: null,
			name: null,
			phone: null,
			surname: null
		},
		articles: [],
		address: {
			id: null,
			code: null,
			country: null,
			state: null,
			city: null,
			street: null,
			number: null,
			ref: null,
			note: null,
			lat: null,
			lng: null
		},
		calendar: {
			id: 0,
			from: '',
			to: '',
			reservation: '',
			type: 'DELIVERY'
		},
		merchant: {
			id: 0,
			email: '',
			phone: '',
			title: ''
		},
		message: null,
		payment: {
			id: 0
		}
	}
};

// * ADMIN SELL INITIAL STATE.
export const ADMIN_SELL_STATE: ISell = {
	articles: {
		status: INITIAL,
		items: []
	},
	article: ARTICLE,
	order: ORDER
};
