import { Action, ActionReducer, createReducer } from '@ngrx/store';

// * STATE - Const.
import { ADMIN_SELL_STATE } from './sell.state';

// * Interfaces.
import { ISell } from '@sell/interfaces/sell.interface';

export const ADMIN_SELL_REDUCERS: ActionReducer<ISell, Action> = createReducer(
	// * INITIAL STATE.
	ADMIN_SELL_STATE
);
