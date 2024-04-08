import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

// * Interfaces.
import { ICollectionElementsResponse, ICollectionResponse, ILibraryResponse } from './common.response';

// * LOAD LIBRARY.
export const LIBRARY_LOAD: ActionCreator<
	'[Library] Load Library',
	(props: { library: number }) => TypedAction<'[Library] Load Library'> & {
		library: number;
	}
> = createAction('[Library] Load Library', props<{ library: number }>());
export const LIBRARY_LOADED: ActionCreator<
	'[Library] Loaded Library',
	(props: { res: ILibraryResponse }) => TypedAction<'[Library] Loaded Library'> & {
		res: ILibraryResponse;
	}
> = createAction('[Library] Loaded Library', props<{ res: ILibraryResponse }>());

// * SELECT ELEMENT.
export const LIBRARY_SELECT_ELEMENT: ActionCreator<
	'[Library] Select Element',
	(props: { library: number; element: number }) => TypedAction<'[Library] Select Element'> & {
		library: number;
		element: number;
	}
> = createAction('[Library] Select Element', props<{ library: number; element: number }>());

// * LOAD LIBRARY CONF.
export const LIBRARY_CONF_LOAD: ActionCreator<
	'[Library] Load Library Conf',
	(props: { library: number; title: boolean }) => TypedAction<'[Library] Load Library Conf'> & {
		library: number;
		title: boolean;
	}
> = createAction('[Library] Load Library Conf', props<{ library: number; title: boolean }>());
export const LIBRARY_CONF_LOADED: ActionCreator<
	'[Library] Loaded Library Conf',
	(props: { library: number }) => TypedAction<'[Library] Loaded Library Conf'> & {
		library: number;
	}
> = createAction('[Library] Loaded Library Conf', props<{ library: number }>());

// * LIBRARY RENAME.
export const LIBRARY_RENAME: ActionCreator<
	'[Library] Rename',
	(props: { library: number; title: string }) => TypedAction<'[Library] Rename'> & {
		library: number;
		title: string;
	}
> = createAction('[Library] Rename', props<{ library: number; title: string }>());
export const LIBRARY_RENAMED: ActionCreator<
	'[Library] Renamed',
	(props: { library: number; title: string; status: number }) => TypedAction<'[Library] Renamed'> & {
		library: number;
		title: string;
		status: number;
	}
> = createAction('[Library] Renamed', props<{ library: number; title: string; status: number }>());

// * LOAD COLLECTION.
export const COLLECTION_LOAD: ActionCreator<
	'[Collection] Load Collection',
	(props: { collection: number }) => TypedAction<'[Collection] Load Collection'> & { collection: number }
> = createAction('[Collection] Load Collection', props<{ collection: number }>());
export const COLLECTION_LOADED: ActionCreator<
	'[Collection] Loaded Collection',
	(props: { res: ICollectionResponse }) => TypedAction<'[Collection] Loaded Collection'> & { res: ICollectionResponse }
> = createAction('[Collection] Loaded Collection', props<{ res: ICollectionResponse }>());

// ! CHECK THIS.
// * LOAD COLLECTION ELEMENTS.
export const COLLECTION_ELEMENTS_LOAD: ActionCreator<
	'[Collection] Load Collection Elements',
	(props: { collection: number }) => TypedAction<'[Collection] Load Collection Elements'> & { collection: number }
> = createAction('[Collection] Load Collection Elements', props<{ collection: number }>());
export const COLLECTION_ELEMENTS_LOADED: ActionCreator<
	'[Collection] Loaded Collection Elements',
	(props: {
		res: ICollectionElementsResponse;
	}) => TypedAction<'[Collection] Loaded Collection Elements'> & { res: ICollectionElementsResponse }
> = createAction('[Collection] Loaded Collection Elements', props<{ res: ICollectionElementsResponse }>());
