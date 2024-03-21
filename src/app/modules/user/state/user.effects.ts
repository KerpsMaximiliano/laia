import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

// * Interfaces.
import { ISQQCheckResponse, ISQQLoginResponse } from './user.response';

// * Services.
import { CoreService } from '@services/core.service';

// * Actions.
import { SQQ_CHECK, SQQ_CHECKED, SQQ_LOGIN, SQQ_LOGIN_ERROR, SQQ_LOGIN_SUCCESS, USER_INFO_UPDATE, USER_INFO_UPDATED } from './user.actions';

// * Graphql.
import { MUTATION_USER_INFO, QUERY_SQQ_CHECK, QUERY_SQQ_LOGIN } from './user.graphql';

@Injectable({ providedIn: 'root' })
export class UserEffects {
	private readonly _actions$: Actions = inject(Actions);
	private readonly _core: CoreService = inject(CoreService);

	// ! SQQ Check.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly sqqCheck$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(SQQ_CHECK),
			exhaustMap((action) =>
				this._core.query<ISQQCheckResponse['data']>(QUERY_SQQ_CHECK, { email: action.email }).pipe(
					map((res) => {
						if (res.sqqCheck.status === 0) this._core.redirect('auth/first');
						if (res.sqqCheck.status === 1 && action.google) this._core.origin();
						if (res.sqqCheck.status === 0 || (res.sqqCheck.status === 1 && action.google)) this._core.set('user', res.sqqCheck.userId);
						return SQQ_CHECKED({
							id: res.sqqCheck.userId,
							email: action.email,
							name: res.sqqCheck.userName,
							surname: res.sqqCheck.userLastName,
							check: res.sqqCheck.status,
							logged: res.sqqCheck.status === 0 || action.google
						});
					}),
					catchError(() => of({ type: '[ERROR_USER_CHECK]: QUERY_SQQ_CHECK' }))
				)
			)
		);
	});

	// ! SQQ Login.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly sqqLogin$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(SQQ_LOGIN),
			exhaustMap((action) =>
				this._core.query<ISQQLoginResponse['data']>(QUERY_SQQ_LOGIN, { user: action.user, password: action.password }).pipe(
					map((res) => {
						if (res.sqqLogin.status === 1) {
							this._core.origin();
							this._core.set('user', action.user);
							return SQQ_LOGIN_SUCCESS({ phone: res.sqqLogin.phone, image: res.sqqLogin.image });
						} else {
							return SQQ_LOGIN_ERROR();
						}
					}),
					catchError(() => of({ type: '[ERROR_USER_LOGIN]: QUERY_SQQ_LOGIN' }))
				)
			)
		);
	});

	// ! USER INFO UPDATE.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly userInfoUpdate$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(USER_INFO_UPDATE),
			exhaustMap((action) =>
				this._core
					.mutation(MUTATION_USER_INFO, {
						user: action.id,
						password: action.password,
						phone: action.phone,
						name: action.name,
						surname: action.surname
					})
					.pipe(
						map(() => {
							this._core.origin();
							return USER_INFO_UPDATED({ name: action.name, surname: action.surname, phone: action.phone });
						}),
						catchError(() => of({ type: '[ERROR_USER_INFO_UPDATE]: MUTATION_USER_INFO' }))
					)
			)
		);
	});
}
