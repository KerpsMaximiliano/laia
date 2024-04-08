import { MemoizedSelector, createSelector } from '@ngrx/store';

// * STATE - Const.
import { STATE } from '@consts/state.const';

// * Consts.
import { COLLECTION } from '@common/constants/collection.const';
import { AUX_LIBRARY, AUX_LIBRARY_CONFIGURATION } from '@common/constants/library.const';

// * Interfaces.
// * COMMON.
import { ICollection } from '@common/interfaces/collection.interface';
import { ILibrary, ILibraryConf } from '@common/interfaces/libraries.interface';
// * CORE.
import { ILoadableEntity } from '@interfaces/load.interface';
import { IState } from '@interfaces/state.interface';

// * LIBRARY.
export const selectLibrary = (id: number): MemoizedSelector<IState, ILibrary> =>
	createSelector(STATE, (state: IState): ILibrary => {
		if (!Array.isArray(state.common) || state.common.length === 0) return AUX_LIBRARY;

		if (id === 0) return AUX_LIBRARY;

		const INDEX: number = state.common.findIndex((library: ILibrary) => library.id === id);

		if (INDEX === -1) return AUX_LIBRARY;

		return state.common[INDEX];
	});

// * LIBRARY CONFIGURATION.
export const selectLibraryConfiguration = (id: number): MemoizedSelector<IState, ILibraryConf> =>
	createSelector(STATE, (state: IState): ILibraryConf => {
		if (!Array.isArray(state.common) || state.common.length === 0) return AUX_LIBRARY_CONFIGURATION;

		if (id === 0) return AUX_LIBRARY_CONFIGURATION;

		const INDEX: number = state.common.findIndex((library: ILibrary) => library.id === id);

		if (INDEX === -1) return AUX_LIBRARY_CONFIGURATION;

		return {
			status: state.common[INDEX].status,
			title: state.common[INDEX].title,
			conf: state.common[INDEX].conf
		};
	});

// * COLLECTION.
export const selectCollection = (library: number, collection: number): MemoizedSelector<IState, ILoadableEntity<ICollection>> =>
	createSelector(STATE, (state: IState): ILoadableEntity<ICollection> => {
		if (!Array.isArray(state.common) || state.common.length === 0) return COLLECTION;

		const INDEX_LIBRARY: number = state.common.findIndex((lib: ILibrary) => lib.id === library);

		if (INDEX_LIBRARY === -1) return COLLECTION;

		if (!Array.isArray(state.common[INDEX_LIBRARY].collections) || state.common[INDEX_LIBRARY].collections.length === 0) return COLLECTION;

		const LIBRARIES: ILibrary[] = [...state.common];

		const INDEX_COLLECTION: number = LIBRARIES[INDEX_LIBRARY].collections.findIndex(
			(col: ILoadableEntity<ICollection>) => col.data.id === collection
		);

		if (INDEX_COLLECTION === -1) return COLLECTION;

		return LIBRARIES[INDEX_LIBRARY].collections[INDEX_COLLECTION];
	});

// * ELEMENT SELECTED.
export const selectElementSelected = (library: number): MemoizedSelector<IState, number | null> =>
	createSelector(STATE, (state: IState): number | null => {
		if (!Array.isArray(state.common) || state.common.length === 0) return null;

		const INDEX_LIBRARY: number = state.common.findIndex((lib: ILibrary) => lib.id === library);

		if (INDEX_LIBRARY === -1) return null;

		return state.common[INDEX_LIBRARY].selected;
	});
