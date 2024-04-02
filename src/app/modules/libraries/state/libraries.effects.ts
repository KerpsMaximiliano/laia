import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

// * Env.
import { environment } from '@env/environment';

// * Consts.
import { LOADED, LOADING } from '@consts/load.const';

// * Interfaces.
import { IArticlesResponse, ICreateArticle } from './libraries.response';

// * Services.
import { CoreService } from '@services/core.service';

import { ILoading } from '@sorts/loading.sort';

// * Actions.
import {
	ADMIN_SELL_ARTICLE_CREATE,
	ADMIN_SELL_ARTICLE_CREATED,
	ADMIN_SELL_ARTICLES_LOAD,
	ADMIN_SELL_ARTICLES_LOADED
} from './libraries.actions';

// * Graphql.
import { QUERY_ADMIN_SELL_ARTICLES } from './libraries.graphql';

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
				const user: string | undefined = this._core.get('user');

				const body: FormData = new FormData();
				body.append('status', '1');
				body.append('typeOfPrice', action.tPrice);
				body.append('typeOfSale', action.tStock);

				if (user) {
					body.append('userId', user);
				}
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

				return this._core.post<ICreateArticle>('/product/create-aux', body).pipe(
					map((res) => {
						const user: string | undefined = this._core.get('user');
						if (!user) {
							this._core.set('product', res.productId);
							this._core.redirect('auth');
						}
						return ADMIN_SELL_ARTICLE_CREATED({
							id: res.productId,
							medias: res.medias.map((media) => media),
							title: action.title,
							price: { amount: action.price, type: 'USD' },
							stock: { quantity: action.stock, type: action.tStock },
							segmentMedia: res.segmentMedia?.url ?? null
						});
					}),
					catchError(() => of({ type: '[ERROR_ADMIN_SELL_ARTICLE_CREATE]: POST_PRODUCT_CREATE_AUX' }))
				);
			})
		);
	});
}
