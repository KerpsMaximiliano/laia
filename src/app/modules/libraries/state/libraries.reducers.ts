import { createReducer, on } from '@ngrx/store';

// * STATE - Const.
import { LIBRARIES_STATE } from './libraries.state';

// * Consts.

// * Functions.

// * Interfaces.
import { ILibrary } from '@libraries/interfaces/libraries.interface';

// * Actions.
import { uLibrary } from '../functions/libraries.function';
import { LIBRARY_LOAD, LIBRARY_LOADED, LIBRARY_SELECT_ELEMENT } from './libraries.actions';

export const LIBRERIES_REDUCERS = createReducer(
	// * INITIAL STATE.
	LIBRARIES_STATE,
	// * LIBRARY LOAD.
	on(LIBRARY_LOAD, (state): ILibrary[] => ({ ...state })),
	// * LIBRARY LOADED.
	on(LIBRARY_LOADED, (state, { res }): ILibrary[] => uLibrary(state, res)),
	// * LIBRARY COLLECTION SELECT ELEMENT.
	on(LIBRARY_SELECT_ELEMENT, (state, { library, element }): ILibrary[] => {
		if (state.length === 0) return { ...state };

		const LIBRARIES: ILibrary[] = [...state];

		const INDEX: number = LIBRARIES.findIndex((item: ILibrary) => item.id === library);

		if (INDEX === -1) return { ...state };

		LIBRARIES[INDEX].selected = LIBRARIES[INDEX].selected === element ? null : element;

		return LIBRARIES;
	})
);
