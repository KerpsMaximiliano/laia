import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

// * Interfaces.
import { IResponse } from '@interfaces/response.interface';
import { IUserLoginResponse } from './user.response';

// * Services.
import { CoreService } from '@services/core.service';

// * Actions.
import {
	USER_CHECK,
	USER_CHECKED,
	USER_INFO,
	USER_INFO_SUCCESS,
	USER_LOGIN,
	USER_LOGIN_ERROR,
	USER_LOGIN_SUCCESS
} from './user.actions';

// * Graphql.
import { MUTATION_USER_INFO, QUERY_USER_CHECK, QUERY_USER_LOGIN } from './user.graphql';

@Injectable({ providedIn: 'root' })
export class UserEffects {
	private readonly _actions$: Actions = inject(Actions);
	private readonly _core: CoreService = inject(CoreService);

	// ! USER CHECK.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly userCheck$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(USER_CHECK),
			exhaustMap((action) => {
				const user: number | undefined = localStorage.getItem('user')
					? Number(localStorage.getItem('user'))
					: undefined;
				if (user) {
					return this._core
						.query<IResponse<{ cUserE: number }>['data']>(QUERY_USER_CHECK, { user, email: action.email }, true)
						.pipe(
							map((res) => {
								if (res.cUserE === 0) localStorage.setItem('email', String(action.email));
								return USER_CHECKED({ check: res.cUserE, logged: res.cUserE === 0 });
							}),
							catchError(() => of({ type: '[ERROR_ECOMMERCE_USER_CHECK]: QUERY_USER_CHECK' }))
						);
				} else {
					return of({ type: '[ERROR_ECOMMERCE_USER_CHECK]: USER_NOT_FOUND' });
				}
			})
		);
	});

	// ! USER LOGIN.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly userLogin$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(USER_LOGIN),
			exhaustMap((action) => {
				let user: number | undefined = localStorage.getItem('user') ? Number(localStorage.getItem('user')) : undefined;
				if (user) {
					if (action.user !== 1) user = action.user;
					return this._core
						.query<
							IUserLoginResponse['data']
						>(QUERY_USER_LOGIN, { user, email: action.email, password: action.password }, false)
						.pipe(
							map((res) => {
								if (res.lUser.operationStatus === 1) {
									localStorage.setItem('user', String(action.user));
									localStorage.setItem('email', action.email);
									// this._core.state.ecommerce.user = action.user;
									return USER_LOGIN_SUCCESS({ email: action.email });
								} else {
									return USER_LOGIN_ERROR({ err: 1 });
								}
							}),
							catchError(() => of({ type: '[ERROR_ECOMMERCE_USER_LOGIN]: QUERY_USER_LOGIN' }))
						);
				} else {
					return of({ type: '[ERROR_ECOMMERCE_USER_LOGIN]: USER_NOT_FOUND' });
				}
			})
		);
	});

	// ! USER INFO.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly updateUserInfo$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(USER_INFO),
			exhaustMap((action) => {
				// const user: number | undefined = this._core.state.ecommerce.user;
				const user: number | undefined = undefined;
				if (user) {
					return this._core
						.mutation(MUTATION_USER_INFO, {
							user,
							name: action.name,
							surname: action.surname,
							phone: action.phone,
							password: action.password
						})
						.pipe(
							map(() => USER_INFO_SUCCESS({ name: action.name, surname: action.surname, phone: action.phone })),
							catchError(() => of({ type: '[ERROR_ECOMMERCE_USER_INFO]: MUTATION_USER_INFO' }))
						);
				} else {
					return of({ type: '[ERROR_ECOMMERCE_USER_INFO]: USER_NOT_FOUND' });
				}
			})
		);
	});
}
