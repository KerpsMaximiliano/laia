import { createAction, props } from '@ngrx/store';

// * Interfaces.
import { TLibrary } from '../sorts/libraries.sort';
import { IgAdminSellLibraryResponse } from './libraries.response';

// * LOAD LIBRARY.
export const LIBRARY_LOAD = createAction('[Library] Load Library', props<{ library: number }>());
export const LIBRARY_LOADED = createAction('[Library] Loaded Library', props<{ id: number; res: IgAdminSellLibraryResponse }>());

export const LIBRARY_SELECT_ELEMENT = createAction('[Library] Select Element', props<{ id: number; library: TLibrary }>());

// export const LIBRARY_LOADED = createAction('[Library] Loaded Library', props<{ library: ILibraryAux; tLibrary: TLibrary }>());
