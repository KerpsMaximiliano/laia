import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

// * Interfaces.
import { IArticlesResponse } from './sell.response';

// * Services.
import { CoreService } from '@services/core.service';

// * Actions.
import { ADMIN_SELL_ARTICLES_LOAD, ADMIN_SELL_ARTICLES_LOADED } from './sell.actions';

// * Graphql.
import { LOADED, LOADING } from '../../../../../core/constants/load.const';
import { ILoading } from '../../../../../core/sorts/loading.sort';
import { QUERY_ADMIN_SELL_ARTICLES } from './sell.graphql';

@Injectable({ providedIn: 'root' })
export class SellEffects {
	private readonly _actions$: Actions = inject(Actions);
	private readonly _core: CoreService = inject(CoreService);
	private readonly _loaded: ILoading = LOADED;
	private readonly _loading: ILoading = LOADING;

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
											categories: { status: this._loading, items: [], count: 0 },
											commissions: 0,
											hashtag: null,
											investments: 0,
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
}
