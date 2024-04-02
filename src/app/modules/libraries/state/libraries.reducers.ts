import { createReducer, on } from '@ngrx/store';

// * STATE - Const.
import { LIBRARIES_STATE } from './libraries.state';

// * Consts.

// * Interfaces.
import { ILibraries } from '@libraries/interfaces/libraries.interface';

// * Actions.
import { LIBRARY_LOAD, LIBRARY_LOADED } from './libraries.actions';

export const LIBRERIES_REDUCERS = createReducer(
	// * INITIAL STATE.
	LIBRARIES_STATE,
	on(LIBRARY_LOAD, (state): ILibraries => state),
	on(LIBRARY_LOADED, (state, { library }): ILibraries => ({ ...state, ...library }))
);
