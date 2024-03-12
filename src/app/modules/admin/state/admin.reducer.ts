import { Action, ActionReducer, createReducer } from '@ngrx/store';

// * STATE - Const.
import { ADMIN_STATE } from './admin.state';

// * Interfaces.
import { IAdmin } from '@admin/interfaces/admin.interface';

export const ADMIN_REDUCERS: ActionReducer<IAdmin, Action> = createReducer(
	// * INITIAL STATE.
	ADMIN_STATE
);
