import { createAction, props } from '@ngrx/store';

// * Interfaces.
import { ILibrary } from '@libraries/interfaces/libraries.interface';

// * Sorts.
import { TLibrary } from '@libraries/sorts/libraries.sort';

// * LOAD LIBRARY.
export const LIBRARY_LOAD = createAction('[Library] Load Library', props<{ library: number }>());
export const LIBRARY_LOADED = createAction('[Library] Loaded Library', props<{ library: ILibrary<TLibrary> }>());
