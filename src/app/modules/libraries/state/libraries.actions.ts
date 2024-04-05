import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

// * Interfaces.
import { IgAdminSellLibraryResponse } from './libraries.response';

// * LOAD LIBRARY.
export const LIBRARY_LOAD: ActionCreator<
	'[Library] Load Library',
	(props: { library: number }) => TypedAction<'[Library] Load Library'> & {
		library: number;
	}
> = createAction('[Library] Load Library', props<{ library: number }>());
export const LIBRARY_LOADED: ActionCreator<
	'[Library] Loaded Library',
	(props: { res: IgAdminSellLibraryResponse }) => TypedAction<'[Library] Loaded Library'> & {
		res: IgAdminSellLibraryResponse;
	}
> = createAction('[Library] Loaded Library', props<{ res: IgAdminSellLibraryResponse }>());

// * SELECT ELEMENT.
export const LIBRARY_SELECT_ELEMENT: ActionCreator<
	'[Library] Select Element',
	(props: { library: number; element: number }) => TypedAction<'[Library] Select Element'> & {
		library: number;
		element: number;
	}
> = createAction('[Library] Select Element', props<{ library: number; element: number }>());

// * LOAD LIBRARY CONF.
export const LIBRARY_CONF_LOAD = createAction('[Library] Load Library Conf', props<{ library: number; title: boolean }>());
export const LIBRARY_CONF_LOADED = createAction('[Library] Loaded Library Conf', props<{ library: number }>());
