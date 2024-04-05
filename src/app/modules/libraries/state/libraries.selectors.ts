import { MemoizedSelector, createSelector } from '@ngrx/store';

// * STATE - Const.
import { STATE } from '@consts/state.const';

// * Consts.

// * Interfaces.
import { IState } from '@interfaces/state.interface';
import { ILibraries } from '../interfaces/libraries.interface';

// * LIBRARY.
export const selectLibrary = <K extends keyof ILibraries>(key: K): MemoizedSelector<IState, ILibraries[K]> =>
	createSelector(STATE, (state: IState): ILibraries[K] => state.libraries[key]);
