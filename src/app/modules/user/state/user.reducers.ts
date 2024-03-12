import { Action, ActionReducer, createReducer } from '@ngrx/store';

// * STATE - Const.
import { USER_STATE } from './user.state';

// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';
import { IUser } from '@user/interfaces/user.interface';

export const USER_REDUCERS: ActionReducer<ILoadableEntity<IUser>, Action> = createReducer(
	// * INITIAL STATE.
	USER_STATE
);
