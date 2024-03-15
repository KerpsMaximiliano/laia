import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

// * STATE - Const.
import { USER_STATE } from './user.state';

// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';
import { IUser } from '@user/interfaces/user.interface';

// * Actions.
import { USER_CHECK } from './user.actions';

export const USER_REDUCERS: ActionReducer<ILoadableEntity<IUser>, Action> = createReducer(
	// * INITIAL STATE.
	USER_STATE,
	on(USER_CHECK, (state): ILoadableEntity<IUser> => {
		return { ...state };
	})
);
