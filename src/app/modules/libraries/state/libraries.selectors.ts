import { MemoizedSelector, createSelector } from '@ngrx/store';

// * STATE - Const.
import { STATE } from '@consts/state.const';

// * Consts.
import { LIBRARY, LIBRARY_CONF } from '@libraries/constants/libraries.const';

// * Interfaces.
import { IState } from '@interfaces/state.interface';
import { ILibrary, ILibraryConf } from '@libraries/interfaces/libraries.interface';

// * LIBRARY.
export const selectLibrary = (id: number): MemoizedSelector<IState, ILibrary> =>
	createSelector(STATE, (state: IState): ILibrary => {
		if (!Array.isArray(state.libraries) || state.libraries.length === 0) return LIBRARY;

		if (id === 0) return LIBRARY;

		const INDEX: number = state.libraries.findIndex((library: ILibrary) => library.id === id);

		if (INDEX === -1) return LIBRARY;

		return state.libraries[INDEX];
	});

// * LIBRARY CONFIGURATION.
export const selectLibraryConf = (id: number): MemoizedSelector<IState, ILibraryConf> =>
	createSelector(STATE, (state: IState): ILibraryConf => {
		if (!Array.isArray(state.libraries) || state.libraries.length === 0) return LIBRARY_CONF;

		if (id === 0) return LIBRARY_CONF;

		const INDEX: number = state.libraries.findIndex((library: ILibrary) => library.id === id);

		if (INDEX === -1) return LIBRARY_CONF;

		return {
			status: state.libraries[INDEX].status,
			title: state.libraries[INDEX].title,
			default: state.libraries[INDEX].default,
			button: state.libraries[INDEX].button[1]
		};
	});
