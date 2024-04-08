import { createReducer, on } from '@ngrx/store';

// * STATE - Const.
import { COMMON_STATE } from './common.state';

// * Consts.
import { COMPLETE, FAILED, UPDATING } from '@consts/load.const';

// * Functions.
import { transformCollection } from '@common/functions/collection.function';
import { transformLibrary } from '@common/functions/libraries.function';

// * Interfaces.
import { ILibrary } from '@common/interfaces/libraries.interface';

// * Actions.
import {
	COLLECTION_LOAD,
	COLLECTION_LOADED,
	LIBRARY_LOAD,
	LIBRARY_LOADED,
	LIBRARY_RENAME,
	LIBRARY_RENAMED,
	LIBRARY_SELECT_ELEMENT
} from './common.actions';

export const COMMON_REDUCERS = createReducer(
	// * INITIAL STATE.
	COMMON_STATE,
	// * LIBRARY LOAD.
	on(LIBRARY_LOAD, (state): ILibrary[] => state),
	// * LIBRARY LOADED.
	on(LIBRARY_LOADED, (state, { res }): ILibrary[] => transformLibrary(state, res)),
	// * LIBRARY RENAME.
	on(LIBRARY_RENAME, (state, { library }): ILibrary[] => {
		if (!Array.isArray(state) || state.length === 0) return [...state];

		const INDEX: number = state.findIndex((item: ILibrary) => item.id === library);

		if (INDEX === -1) return [...state];

		const LIBRARIES: ILibrary[] = [...state];

		LIBRARIES[INDEX] = { ...LIBRARIES[INDEX], status: UPDATING };

		return LIBRARIES;
	}),
	// * LIBRARY RENAMED.
	on(LIBRARY_RENAMED, (state, { library, title, status }): ILibrary[] => {
		if (!Array.isArray(state) || state.length === 0) return [...state];

		const INDEX: number = state.findIndex((item: ILibrary) => item.id === library);

		if (INDEX === -1) return [...state];

		const LIBRARIES: ILibrary[] = [...state];

		if (status === 1) {
			LIBRARIES[INDEX] = { ...LIBRARIES[INDEX], status: COMPLETE, title };
		} else {
			LIBRARIES[INDEX] = { ...LIBRARIES[INDEX], status: FAILED };
		}

		return LIBRARIES;
	}),
	// * COLLECTION LOAD.
	on(COLLECTION_LOAD, (state): ILibrary[] => ({ ...state })),
	// * COLLECTION LOADED.
	on(COLLECTION_LOADED, (state, { res }): ILibrary[] => transformCollection(state, res)),
	// * LIBRARY COLLECTION SELECT ELEMENT.
	on(LIBRARY_SELECT_ELEMENT, (state, { library, element }): ILibrary[] => {
		if (!Array.isArray(state) || state.length === 0 || element === 0) return [...state];

		const INDEX: number = state.findIndex((item: ILibrary) => item.id === library);

		if (INDEX === -1) return [...state];

		const LIBRARIES: ILibrary[] = [...state];

		LIBRARIES[INDEX] = { ...LIBRARIES[INDEX], selected: LIBRARIES[INDEX].selected === element ? null : element };

		return LIBRARIES;
	})
);
