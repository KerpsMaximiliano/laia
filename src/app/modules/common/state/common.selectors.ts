import { MemoizedSelector, createSelector } from '@ngrx/store';

// * STATE - Const.
import { STATE } from '@consts/state.const';

// * Consts.

// * Interfaces.
// * COMMON.
import { ILibrary } from '@common/interfaces/libraries.interface';
// * CORE.
import { IState } from '@interfaces/state.interface';

// * Sorts.
import { TLibraries } from '@common/sorts/common.sort';
import { AUX_COLLECTION } from '../constants/collection.const';
import { ICollection } from '../interfaces/collection.interface';

// * LIBRARY INFORMATION.
export const selectLibraryInformation = (tLibrary: TLibraries): MemoizedSelector<IState, ILibrary['information']> =>
	createSelector(STATE, (state: IState): ILibrary['information'] => state.common[tLibrary].information);

// * LIBRARY VIEW.
export const selectLibraryView = (tLibrary: TLibraries): MemoizedSelector<IState, ILibrary['view']> =>
	createSelector(STATE, (state: IState): ILibrary['view'] => state.common[tLibrary].view);

// * LIBRARY MENU.
export const selectLibraryMenu = (tLibrary: TLibraries): MemoizedSelector<IState, ILibrary['menu']> =>
	createSelector(STATE, (state: IState): ILibrary['menu'] => state.common[tLibrary].menu);

// * LIBRARY MINIATURES.
export const selectLibraryMiniatures = (tLibrary: TLibraries): MemoizedSelector<IState, ILibrary['miniatures']> =>
	createSelector(STATE, (state: IState): ILibrary['miniatures'] => state.common[tLibrary].miniatures);

// * LIBRARY SELECTED.
export const selectLibrarySelected = (tLibrary: TLibraries): MemoizedSelector<IState, number | null> =>
	createSelector(STATE, (state: IState): number | null => state.common[tLibrary].information.selected);

// * COLLECTION INFORMATION.
export const selectCollectionInformation = (query: {
	tLibrary: TLibraries;
	collection: number;
}): MemoizedSelector<IState, ICollection['information']> =>
	createSelector(STATE, (state: IState): ICollection['information'] => {
		if (!Array.isArray(state.common[query.tLibrary].view.collections) || state.common[query.tLibrary].view.collections.length === 0)
			return AUX_COLLECTION['information'];

		const INDEX: number = state.common[query.tLibrary].view.collections.findIndex(
			(collection) => collection.information.id === query.collection
		);

		if (INDEX === -1) return AUX_COLLECTION['information'];

		return state.common[query.tLibrary].view.collections[INDEX]['information'];
	});

// * COLLECTION VIEW.
export const selectCollectionView = (query: { tLibrary: TLibraries; collection: number }): MemoizedSelector<IState, ICollection['view']> =>
	createSelector(STATE, (state: IState): ICollection['view'] => {
		if (!Array.isArray(state.common[query.tLibrary].view.collections) || state.common[query.tLibrary].view.collections.length === 0)
			return AUX_COLLECTION['view'];

		const INDEX: number = state.common[query.tLibrary].view.collections.findIndex(
			(collection) => collection.information.id === query.collection
		);

		if (INDEX === -1) return AUX_COLLECTION['view'];

		return state.common[query.tLibrary].view.collections[INDEX]['view'];
	});

// * COLLECTION MENU.
export const selectCollectionMenu = (query: { tLibrary: TLibraries; collection: number }): MemoizedSelector<IState, ICollection['menu']> =>
	createSelector(STATE, (state: IState): ICollection['menu'] => {
		if (!Array.isArray(state.common[query.tLibrary].view.collections) || state.common[query.tLibrary].view.collections.length === 0)
			return AUX_COLLECTION['menu'];

		const INDEX: number = state.common[query.tLibrary].view.collections.findIndex(
			(collection) => collection.information.id === query.collection
		);

		if (INDEX === -1) return AUX_COLLECTION['menu'];

		return state.common[query.tLibrary].view.collections[INDEX]['menu'];
	});

// * COLLECTION MINIATURES.
export const selectCollectionMiniatures = (query: {
	tLibrary: TLibraries;
	collection: number;
}): MemoizedSelector<IState, ICollection['miniatures']> =>
	createSelector(STATE, (state: IState): ICollection['miniatures'] => {
		if (!Array.isArray(state.common[query.tLibrary].view.collections) || state.common[query.tLibrary].view.collections.length === 0)
			return AUX_COLLECTION['miniatures'];

		const INDEX: number = state.common[query.tLibrary].view.collections.findIndex(
			(collection) => collection.information.id === query.collection
		);

		if (INDEX === -1) return AUX_COLLECTION['miniatures'];

		return state.common[query.tLibrary].view.collections[INDEX]['miniatures'];
	});
