import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

// * Interfaces.
import { ILibrary } from '@common/interfaces/libraries.interface';
// * Responses.
import {
	IcCollectionResponse,
	IgCollectionConfigurationResponse,
	IgCollectionElementsResponse,
	IgCollectionMiniaturesResponse,
	IgCollectionResponse
} from '@common/res/collection-res.interface';
import { IgLibraryConfigurationResponse, IgLibraryMiniaturesResponse, IgLibraryResponse } from '@common/res/library-res.interface';

// * Sorts.
import { TLibraries, TMiniature } from '@common/sorts/common.sort';
import { ICollection } from '../interfaces/collection.interface';

// * LIBRARY VIEW.
export const LIBRARY_VIEW_LOAD: ActionCreator<
	'[Library] View Load',
	(props: { tLibrary: TLibraries; library: number }) => TypedAction<'[Library] View Load'> & {
		tLibrary: TLibraries;
		library: number;
	}
> = createAction('[Library] View Load', props<{ tLibrary: TLibraries; library: number }>());
export const LIBRARY_VIEW_LOADED: ActionCreator<
	'[Library] View Loaded',
	(props: { tLibrary: TLibraries; library: number; res: IgLibraryResponse }) => TypedAction<'[Library] View Loaded'> & {
		tLibrary: TLibraries;
		library: number;
		res: IgLibraryResponse;
	}
> = createAction('[Library] View Loaded', props<{ tLibrary: TLibraries; library: number; res: IgLibraryResponse }>());

// * LIBRARY MENU.
export const LIBRARY_MENU_LOAD: ActionCreator<
	'[Library] Menu Load',
	(props: { tLibrary: TLibraries; library: number; detail: boolean }) => TypedAction<'[Library] Menu Load'> & {
		tLibrary: TLibraries;
		library: number;
		detail: boolean;
	}
> = createAction('[Library] Menu Load', props<{ tLibrary: TLibraries; library: number; detail: boolean }>());
export const LIBRARY_MENU_LOADED: ActionCreator<
	'[Library] Menu Loaded',
	(props: {
		tLibrary: TLibraries;
		library: number;
		res: IgLibraryConfigurationResponse['data'];
	}) => TypedAction<'[Library] Menu Loaded'> & {
		tLibrary: TLibraries;
		library: number;
		res: IgLibraryConfigurationResponse['data'];
	}
> = createAction('[Library] Menu Loaded', props<{ tLibrary: TLibraries; library: number; res: IgLibraryConfigurationResponse['data'] }>());

// * LIBRARY RENAME.
export const LIBRARY_RENAME: ActionCreator<
	'[Library] Rename',
	(props: { tLibrary: TLibraries; library: number; title: string }) => TypedAction<'[Library] Rename'> & {
		tLibrary: TLibraries;
		library: number;
		title: string;
	}
> = createAction('[Library] Rename', props<{ tLibrary: TLibraries; library: number; title: string }>());
export const LIBRARY_RENAMED: ActionCreator<
	'[Library] Renamed',
	(props: { tLibrary: TLibraries; title: string; status: number }) => TypedAction<'[Library] Renamed'> & {
		tLibrary: TLibraries;
		title: string;
		status: number;
	}
> = createAction('[Library] Renamed', props<{ tLibrary: TLibraries; title: string; status: number }>());

// * LIBRARY MINIATURES.
export const LIBRARY_MINIATURES_LOAD: ActionCreator<
	'[Library] Miniatures Load',
	(props: { tLibrary: TLibraries; library: number; detail: boolean }) => TypedAction<'[Library] Miniatures Load'> & {
		tLibrary: TLibraries;
		library: number;
		detail: boolean;
	}
> = createAction('[Library] Miniatures Load', props<{ tLibrary: TLibraries; library: number; detail: boolean }>());
export const LIBRARY_MINIATURES_LOADED: ActionCreator<
	'[Library] Miniatures Loaded',
	(props: {
		tLibrary: TLibraries;
		detail: boolean;
		res: IgLibraryMiniaturesResponse['data'];
	}) => TypedAction<'[Library] Miniatures Loaded'> & {
		tLibrary: TLibraries;
		detail: boolean;
		res: IgLibraryMiniaturesResponse['data'];
	}
> = createAction(
	'[Library] Miniatures Loaded',
	props<{ tLibrary: TLibraries; detail: boolean; res: IgLibraryMiniaturesResponse['data'] }>()
);

// * LIBRARY MINIATURE SELECT.
export const LIBRARY_MINIATURE_SELECT: ActionCreator<
	'[Library] Miniature Select',
	(props: { tLibrary: TLibraries; mode: keyof ILibrary['miniatures']; prop: TMiniature }) => TypedAction<'[Library] Miniature Select'> & {
		tLibrary: TLibraries;
		mode: keyof ILibrary['miniatures'];
		prop: TMiniature;
	}
> = createAction('[Library] Miniature Select', props<{ tLibrary: TLibraries; mode: keyof ILibrary['miniatures']; prop: TMiniature }>());

// * LIBRARY MINIATURES UPDATE.
export const LIBRARY_MINIATURES_UPDATE: ActionCreator<
	'[Library] Update Miniatures',
	(props: {
		tLibrary: TLibraries;
		library: number;
		props: TMiniature[];
		header: TMiniature[];
		title: TMiniature[];
		subtitle: TMiniature[];
	}) => TypedAction<'[Library] Update Miniatures'> & {
		tLibrary: TLibraries;
		library: number;
		props: TMiniature[];
		header: TMiniature[];
		title: TMiniature[];
		subtitle: TMiniature[];
	}
> = createAction(
	'[Library] Update Miniatures',
	props<{ tLibrary: TLibraries; library: number; props: TMiniature[]; header: TMiniature[]; title: TMiniature[]; subtitle: TMiniature[] }>()
);
export const LIBRARY_MINIATURES_UPDATED: ActionCreator<
	'[Library] Updated Miniatures',
	(props: {
		tLibrary: TLibraries;
		props: TMiniature[];
		header: TMiniature[];
		title: TMiniature[];
		subtitle: TMiniature[];
	}) => TypedAction<'[Library] Updated Miniatures'> & {
		tLibrary: TLibraries;
		props: TMiniature[];
		header: TMiniature[];
		title: TMiniature[];
		subtitle: TMiniature[];
	}
> = createAction(
	'[Library] Updated Miniatures',
	props<{ tLibrary: TLibraries; props: TMiniature[]; header: TMiniature[]; title: TMiniature[]; subtitle: TMiniature[] }>()
);

// * COLLECTION VIEW.
export const COLLECTION_VIEW_LOAD: ActionCreator<
	'[Collection] View Load',
	(props: { tLibrary: TLibraries; library: number; collection: number }) => TypedAction<'[Collection] View Load'> & {
		tLibrary: TLibraries;
		library: number;
		collection: number;
	}
> = createAction('[Collection] View Load', props<{ tLibrary: TLibraries; library: number; collection: number }>());
export const COLLECTION_VIEW_LOADED: ActionCreator<
	'[Collection] View Loaded',
	(props: { tLibrary: TLibraries; collection: number; res: IgCollectionResponse }) => TypedAction<'[Collection] View Loaded'> & {
		tLibrary: TLibraries;
		collection: number;
		res: IgCollectionResponse;
	}
> = createAction('[Collection] View Loaded', props<{ tLibrary: TLibraries; collection: number; res: IgCollectionResponse }>());

export const COLLECTION_ELEMENTS_LOAD = createAction(
	'[Collection] Elements Load',
	props<{ tLibrary: TLibraries; collection: number; page: number }>()
);
export const COLLECTION_ELEMENTS_LOADED = createAction(
	'[Collection] Elements Loaded',
	props<{ tLibrary: TLibraries; collection: number; res: IgCollectionElementsResponse }>()
);

// * COLLECTION EXPANDED.
export const COLLECTION_EXPANDED: ActionCreator<
	'[Collection] Expanded',
	(props: { tLibrary: TLibraries; collection: number }) => TypedAction<'[Collection] Expanded'> & {
		tLibrary: TLibraries;
		collection: number;
	}
> = createAction('[Collection] Expanded', props<{ tLibrary: TLibraries; collection: number }>());

// * LIBRARY SELECT ELEMENT.
export const LIBRARY_SELECT_ELEMENT: ActionCreator<
	'[Library] Select Element',
	(props: { tLibrary: TLibraries; element: number }) => TypedAction<'[Library] Select Element'> & {
		tLibrary: TLibraries;
		element: number;
	}
> = createAction('[Library] Select Element', props<{ tLibrary: TLibraries; element: number }>());

// * COLLECTION MENU.
export const COLLECTION_MENU_LOAD: ActionCreator<
	'[Collection] Menu Load',
	(props: { tLibrary: TLibraries; library: number; collection: number; detail: boolean }) => TypedAction<'[Collection] Menu Load'> & {
		tLibrary: TLibraries;
		library: number;
		collection: number;
		detail: boolean;
	}
> = createAction('[Collection] Menu Load', props<{ tLibrary: TLibraries; library: number; collection: number; detail: boolean }>());
export const COLLECTION_MENU_LOADED: ActionCreator<
	'[Collection] Menu Loaded',
	(props: {
		tLibrary: TLibraries;
		collection: number;
		detail: boolean;
		res: IgCollectionConfigurationResponse['data'];
	}) => TypedAction<'[Collection] Menu Loaded'> & {
		tLibrary: TLibraries;
		collection: number;
		detail: boolean;
		res: IgCollectionConfigurationResponse['data'];
	}
> = createAction(
	'[Collection] Menu Loaded',
	props<{ tLibrary: TLibraries; collection: number; detail: boolean; res: IgCollectionConfigurationResponse['data'] }>()
);

// * COLLECTION RENAME.
export const COLLECTION_RENAME: ActionCreator<
	'[Collection] Rename',
	(props: { tLibrary: TLibraries; library: number; collection: number; title: string }) => TypedAction<'[Collection] Rename'> & {
		tLibrary: TLibraries;
		library: number;
		collection: number;
		title: string;
	}
> = createAction('[Collection] Rename', props<{ tLibrary: TLibraries; library: number; collection: number; title: string }>());
export const COLLECTION_RENAMED: ActionCreator<
	'[Collection] Renamed',
	(props: { tLibrary: TLibraries; collection: number; title: string; status: number }) => TypedAction<'[Collection] Renamed'> & {
		tLibrary: TLibraries;
		collection: number;
		title: string;
		status: number;
	}
> = createAction('[Collection] Renamed', props<{ tLibrary: TLibraries; collection: number; title: string; status: number }>());

// * COLLECTION CREATE.
export const COLLECTION_CREATE: ActionCreator<
	'[Collection] Create',
	(props: { tLibrary: TLibraries; library: number }) => TypedAction<'[Collection] Create'> & {
		tLibrary: TLibraries;
		library: number;
	}
> = createAction('[Collection] Create', props<{ tLibrary: TLibraries; library: number }>());
// * COLLECTION CREATE REF.
export const COLLECTION_CREATE_REF: ActionCreator<
	'[Collection] Create Ref',
	(props: { tLibrary: TLibraries; library: number; collection: number }) => TypedAction<'[Collection] Create Ref'> & {
		tLibrary: TLibraries;
		library: number;
		collection: number;
	}
> = createAction('[Collection] Create Ref', props<{ tLibrary: TLibraries; library: number; collection: number }>());
// * COLLECTION CREATED.
export const COLLECTION_CREATED: ActionCreator<
	'[Collection] Created',
	(props: { tLibrary: TLibraries; res: IcCollectionResponse }) => TypedAction<'[Collection] Created'> & {
		tLibrary: TLibraries;
		res: IcCollectionResponse;
	}
> = createAction('[Collection] Created', props<{ tLibrary: TLibraries; res: IcCollectionResponse }>());

// * COLLECTION DELETE.
export const COLLECTION_DELETE: ActionCreator<
	'[Collection] Delete',
	(props: { tLibrary: TLibraries; library: number; collection: number }) => TypedAction<'[Collection] Delete'> & {
		tLibrary: TLibraries;
		library: number;
		collection: number;
	}
> = createAction('[Collection] Delete', props<{ tLibrary: TLibraries; library: number; collection: number }>());
export const COLLECTION_DELETED: ActionCreator<
	'[Collection] Deleted',
	(props: { tLibrary: TLibraries; collection: number }) => TypedAction<'[Collection] Deleted'> & {
		tLibrary: TLibraries;
		collection: number;
	}
> = createAction('[Collection] Deleted', props<{ tLibrary: TLibraries; collection: number }>());

// * COLLECTION MINIATURE.
export const COLLECTION_MINIATURES_LOAD: ActionCreator<
	'[Collection] Miniatures Load',
	(props: { tLibrary: TLibraries; library: number; collection: number; detail: boolean }) => TypedAction<'[Collection] Miniatures Load'> & {
		tLibrary: TLibraries;
		library: number;
		collection: number;
		detail: boolean;
	}
> = createAction('[Collection] Miniatures Load', props<{ tLibrary: TLibraries; library: number; collection: number; detail: boolean }>());
export const COLLECTION_MINIATURES_LOADED: ActionCreator<
	'[Collection] Miniatures Loaded',
	(props: {
		tLibrary: TLibraries;
		collection: number;
		detail: boolean;
		res: IgCollectionMiniaturesResponse['data'];
	}) => TypedAction<'[Collection] Miniatures Loaded'> & {
		tLibrary: TLibraries;
		collection: number;
		detail: boolean;
		res: IgCollectionMiniaturesResponse['data'];
	}
> = createAction(
	'[Collection] Miniatures Loaded',
	props<{ tLibrary: TLibraries; collection: number; detail: boolean; res: IgCollectionMiniaturesResponse['data'] }>()
);

// * COLLECTION MINIATURE SELECT.
export const COLLECTION_MINIATURES_SELECT: ActionCreator<
	'[Collection] Miniatures Select',
	(props: {
		tLibrary: TLibraries;
		collection: number;
		mode: keyof ICollection['miniatures'];
		prop: TMiniature;
	}) => TypedAction<'[Collection] Miniatures Select'> & {
		tLibrary: TLibraries;
		collection: number;
		mode: keyof ICollection['miniatures'];
		prop: TMiniature;
	}
> = createAction(
	'[Collection] Miniatures Select',
	props<{ tLibrary: TLibraries; collection: number; mode: keyof ICollection['miniatures']; prop: TMiniature }>()
);

// * COLLECTION MINIATURE UPDATE.
export const COLLECTION_MINIATURES_UPDATE: ActionCreator<
	'[Collection] Miniatures Update',
	(props: {
		tLibrary: TLibraries;
		collection: number;
		props: TMiniature[];
		header: TMiniature[];
		title: TMiniature[];
		subtitle: TMiniature[];
	}) => TypedAction<'[Collection] Miniatures Update'> & {
		tLibrary: TLibraries;
		collection: number;
		props: TMiniature[];
		header: TMiniature[];
		title: TMiniature[];
		subtitle: TMiniature[];
	}
> = createAction(
	'[Collection] Miniatures Update',
	props<{
		tLibrary: TLibraries;
		collection: number;
		props: TMiniature[];
		header: TMiniature[];
		title: TMiniature[];
		subtitle: TMiniature[];
	}>()
);
export const COLLECTION_MINIATURES_UPDATED: ActionCreator<
	'[Collection] Miniatures Updated',
	(props: {
		tLibrary: TLibraries;
		collection: number;
		header: TMiniature[];
		title: TMiniature[];
		subtitle: TMiniature[];
	}) => TypedAction<'[Collection] Miniatures Updated'> & {
		tLibrary: TLibraries;
		collection: number;
		header: TMiniature[];
		title: TMiniature[];
		subtitle: TMiniature[];
	}
> = createAction(
	'[Collection] Miniatures Updated',
	props<{
		tLibrary: TLibraries;
		collection: number;
		header: TMiniature[];
		title: TMiniature[];
		subtitle: TMiniature[];
	}>()
);
