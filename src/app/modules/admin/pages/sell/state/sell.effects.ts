import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

// * Env.
import { environment } from '@env/environment';

// * Consts.
import { LOADED, LOADING } from '@consts/load.const';

// * Interfaces.
import { IArticlesResponse } from './sell.response';

// * Services.
import { CoreService } from '@services/core.service';

import { ILoading } from '@sorts/loading.sort';

// * Actions.
import {
	ADMIN_SELL_ARTICLE_CREATE,
	ADMIN_SELL_ARTICLE_CREATED,
	ADMIN_SELL_ARTICLES_LOAD,
	ADMIN_SELL_ARTICLES_LOADED
} from './sell.actions';

// * Graphql.
import { QUERY_ADMIN_SELL_ARTICLES } from './sell.graphql';

@Injectable({ providedIn: 'root' })
export class SellEffects {
	private readonly _actions$: Actions = inject(Actions);
	private readonly _core: CoreService = inject(CoreService);
	private readonly _loaded: ILoading = LOADED;
	private readonly _loading: ILoading = LOADING;
	private readonly _api: string = environment.api;

	// ! ARTICLES.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly articles$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(ADMIN_SELL_ARTICLES_LOAD),
			exhaustMap((action) => {
				return this._core
					.query<IArticlesResponse['data']>(QUERY_ADMIN_SELL_ARTICLES, { page: action.page ?? 1, merchant: action.merchant })
					.pipe(
						map((res) =>
							ADMIN_SELL_ARTICLES_LOADED({
								articles: res.products.map((article) => {
									return {
										status: this._loaded,
										data: {
											id: article.id,
											price: { amount: article.price, type: 'USD' },
											stock: { quantity: article.stock, type: article.typeOfSale },
											title: article.title,
											commissions: { status: this._loading, items: [], total: 0 },
											hashtag: null,
											investments: { status: this._loading, items: [], total: 0 },
											keywords: { status: this._loading, items: [], count: 0 },
											manufacturing: { time: null, type: 'MINUTE' },
											medias: article.frontPage ? [{ url: article.frontPage, type: 'IMAGE' }] : [],
											questions: { count: 0, items: [], status: 'INITIAL' },
											segments: { count: 0, items: [], status: 'INITIAL' }
										}
									};
								})
							})
						),
						catchError(() => of({ type: '[ERROR_ADMIN_SELL_ARTICLES]: QUERY_ADMIN_SELL_ARTICLES' }))
					);
			})
		);
	});

	// ! CREATE ARTICLE.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly createArticle$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(ADMIN_SELL_ARTICLE_CREATE),
			exhaustMap((action) => {
				const body: FormData = new FormData();
				body.append('status', '1');
				body.append('typeOfPrice', action.tPrice);
				body.append('typeOfSale', action.tStock);

				if (action.medias.length > 0) {
					action.medias.forEach((media) => {
						body.append('medias', media);
					});
				}
				if (action.title) body.append('title', action.title);
				if (action.price) body.append('price', `${action.price}`);
				if (action.stock) body.append('stock', `${action.stock}`);
				if (action.hashtag) body.append('hashtagValue', action.hashtag);
				if (action.manufacturing) body.append('manufacturingTime', `${action.manufacturing}`);
				if (action.manufacturing) body.append('manufacturingType', action.tManufacturing);
				if (action.segmentTitle) body.append('segmentTitle', action.segmentTitle);
				if (action.segmentDescription) body.append('segmentDescription', action.segmentDescription);
				if (action.segmentMedia) body.append('segmentMedia', action.segmentMedia);
				if (action.keywords.length > 0) {
					const keywords: string = action.keywords.map((keyword) => keyword).join('♀');
					body.append('keywords', keywords);
				}
				if (action.question) {
					body.append('sellerQuestionValue', action.question);
					body.append('sellerQuestionType', action.questionType);
					body.append('sellerQuestionRequired', `${action.questionRequired}`);
					if (action.questionType === 'MULTIPLE') {
						body.append('sellerQuestionLimit', `${action.questionLimit}`);
						if (action.questionOptions.length > 0) {
							const options: string = action.questionOptions.map((option) => `${option}`).join('♀');
							body.append('sellerQuestionOptions', options);
						}
					}
				}

				return this._core.post<{ productId: number; medias: { url: string; type: 'IMAGE' }[] }>('/product/create-aux', body).pipe(
					map((res) =>
						ADMIN_SELL_ARTICLE_CREATED({
							id: res.productId,
							medias: res.medias.map((media) => media),
							title: action.title,
							price: { amount: action.price, type: 'USD' },
							stock: { quantity: action.stock, type: action.tStock }
						})
					),
					catchError(() => of({ type: '[ERROR_ADMIN_SELL_ARTICLE_CREATE]: POST_PRODUCT_CREATE_AUX' }))
				);
			})
		);
	});
}

// {
// 	"productId": 21,
// 	"medias": [
// 			{
// 					"url": "https://storage.googleapis.com/laia-c5d59.appspot.com/frontPages/front-page-product-21?GoogleAccessId=firebase-adminsdk-ey4kc@laia-c5d59.iam.gserviceaccount.com&Expires=2026551880&Signature=Dv5ESTB0wh%2BemGHnlU6eqy6HNlILveTWxbcqWpSptozZ66tuYkAvLynDv4c8ayKVSUSUjcb2yRMju2fW38JQlXOFolZ6ojeydCFAzdsVGKvTnpkyUERsqKArgUMIcurc%2FRPDWkq8P7xdeSlWXuCYEW67ZbP0UMXaUQl84Rf92ypPJLvaMlSL3h8Eow2W5DM3rFG%2B5JMqjSiIy79O3Ew2DIKtDFvbO1A3vG7uusqGzOnnoxytUaCLtY4Ujg%2FzpNHZ5RoCHApws3o0L6Eo2IIhTUKqSBMRYslPTYVyNfgUYIUBZ9Lr4w7PlWmpOAvmgUP6%2FKVypG0%2B0p1ylahV9cpwYg%3D%3D",
// 					"type": "IMAGE"
// 			},
// 			{
// 					"url": "https://storage.googleapis.com/laia-c5d59.appspot.com/imageProducts/image-product-21?GoogleAccessId=firebase-adminsdk-ey4kc@laia-c5d59.iam.gserviceaccount.com&Expires=2026551880&Signature=NCNgsy9VA%2BQBDZz97f%2Fz7xhdFnFLghp1uLMpFI5RW2ao7ofzkdeyNY7ZBrzAJtiWz3lcSOp6t%2B9tACaL%2B6OKedJ1bf%2FXPw6walpQqJgcBBzng46eMJS4Ug22CHlfNCqj81EZ1By3X7Ni8Nsqw1ajT9yvamfrEX5MkAXje1e7Rqw1HG8HWsaSHUi2nSYwet9dJpLWDehP9O8%2Foy9QIQvzbMv%2BHo6C9icRJZYoa7aMWuK%2BOLA9CWkHyMRuu6pkBOVp8TRL0OspKuqfXOU6NA%2Bya6ASeL3QLZPnyARxYGwAsVrohJiTEAH8mQp6zzKNpJk0MmYhnKqX6QxmCe7C3%2FDyWw%3D%3D",
// 					"type": "IMAGE"
// 			},
// 			{
// 					"url": "https://storage.googleapis.com/laia-c5d59.appspot.com/imageProducts/image-product-21?GoogleAccessId=firebase-adminsdk-ey4kc@laia-c5d59.iam.gserviceaccount.com&Expires=2026551881&Signature=j5sQaiDWLgI6UGwj%2F5qnF9i%2BvuDxuDq1PkfnjECMqttMyCGH%2B6sQ7hHM4HDEfeXs5qVxct%2FIPXOOw1qSCjbxkwQidjnU0VaaKWwZOJ1xWPiqaYwOVAbwdDrnUK964zSmXIy3aXRRUgi3BKg7cYXnM5Tw7MJkPicp3cM2s%2FnwH10xqaB10YLdHjjT5aLCcCyKW2CLFPxK3REWWaRDlxRkKmKCLdGS3le1VUSQc2zw8gv%2FQCGcIMA9g5W1GWvCjY1Ogbefou5fV68EdXyEmEAx%2B5robL2cQyQUcK2QF%2F340DQOLUfCuhoZI7DNL93seuyllHo1W2O%2BzlE3mfRvVvHaow%3D%3D",
// 					"type": "IMAGE"
// 			}
// 	]
// }
