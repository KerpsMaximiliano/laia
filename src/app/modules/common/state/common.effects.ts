import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

// * Services.
import { CoreService } from '@services/core.service';

// * Actions.
import {
	COLLECTION_CREATE,
	COLLECTION_CREATE_REF,
	COLLECTION_CREATED,
	COLLECTION_DELETE,
	COLLECTION_DELETED,
	COLLECTION_ELEMENTS_LOAD,
	COLLECTION_ELEMENTS_LOADED,
	COLLECTION_MENU_LOAD,
	COLLECTION_MENU_LOADED,
	COLLECTION_MINIATURES_LOAD,
	COLLECTION_MINIATURES_LOADED,
	COLLECTION_MINIATURES_UPDATE,
	COLLECTION_MINIATURES_UPDATED,
	COLLECTION_RENAME,
	COLLECTION_RENAMED,
	COLLECTION_VIEW_LOAD,
	COLLECTION_VIEW_LOADED,
	LIBRARY_MENU_LOAD,
	LIBRARY_MENU_LOADED,
	LIBRARY_MINIATURES_LOAD,
	LIBRARY_MINIATURES_LOADED,
	LIBRARY_MINIATURES_UPDATE,
	LIBRARY_MINIATURES_UPDATED,
	LIBRARY_RENAME,
	LIBRARY_RENAMED,
	LIBRARY_VIEW_LOAD,
	LIBRARY_VIEW_LOADED
} from './common.actions';

// * GraphQl.
// * QUERY.
import { QUERY_COLLECTION_MENU, QUERY_COLLECTION_MINIATURES } from '@common/graphql/query/collection.query';
import { QUERY_LIBRARY_MENU, QUERY_LIBRARY_MINIATURES } from '@common/graphql/query/library.query';
// * MUTATION.
import {
	MUTATION_COLLECTION_DELETE,
	MUTATION_COLLECTION_MINIATURES,
	MUTATION_COLLECTION_RENAME
} from '@common/graphql/mutation/collection.mutation';
import { MUTATION_LIBRARY_MINIATURES, MUTATION_LIBRARY_RENAME } from '@common/graphql/mutation/library.mutation';

// * REST API.
import {
	IcCollectionRefRequest,
	IcCollectionRequest,
	IgCollectionElementsRequest,
	IgCollectionRequest
} from '@common/restapi/collection-req.interface';
import { IgLibraryRequest } from '@common/restapi/library-req.interface';

// * Responses.
import {
	IcCollectionResponse,
	IdCollectionResponse,
	IgCollectionConfigurationResponse,
	IgCollectionElementsResponse,
	IgCollectionMiniaturesResponse,
	IgCollectionResponse,
	IuCollectionMiniatureResponse,
	IuCollectionRenameResponse
} from '@common/res/collection-res.interface';
import {
	IgLibraryConfigurationResponse,
	IgLibraryMiniaturesResponse,
	IgLibraryResponse,
	IuLibraryMiniaturesResponse,
	IuLibraryRenameResponse
} from '@common/res/library-res.interface';

@Injectable({ providedIn: 'root' })
export class CommonEffects {
	private readonly _actions$: Actions = inject(Actions);
	private readonly _core: CoreService = inject(CoreService);

	// ! LIBRARY VIEW.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly libraryView$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(LIBRARY_VIEW_LOAD),
			exhaustMap((action) =>
				this._core
					.get<IgLibraryResponse, IgLibraryRequest>('/library/gLibrary', {
						userId: 1, // ! Esta hardcodeado el user ID.
						libraryId: action.library
					})
					.pipe(
						map((res) => {
							if (res.operation === 0) {
								// ! REDIRIGIR A PÁGINA DE PRIVACIDAD.
								return { type: '[ERROR_LIBRARY]: GET - OPERATION 0' };
							} else {
								return LIBRARY_VIEW_LOADED({ tLibrary: action.tLibrary, library: action.library, res });
							}
						}),
						catchError(() => {
							// ! REDIRIGIR A 404.
							return of({ type: '[ERROR_LIBRARY]: GET' });
						})
					)
			)
		);
	});

	// ! LIBRARY MENU.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly libraryMenu$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(LIBRARY_MENU_LOAD),
			exhaustMap((action) =>
				this._core
					.query<IgLibraryConfigurationResponse['data']>(QUERY_LIBRARY_MENU, { library: action.library, user: 1, detail: action.detail })
					.pipe(
						map((res) => {
							if (res.gLibraryConf.operation === 0) {
								// ! REDIRIGIR A PÁGINA DE PRIVACIDAD.
								return { type: '[ERROR_LIBRARY]: MENU - OPERATION 0' };
							} else {
								return LIBRARY_MENU_LOADED({ tLibrary: action.tLibrary, library: action.library, res });
							}
						}),
						catchError(() => {
							// ! REDIRIGIR A 404.
							return of({ type: '[ERROR_LIBRARY]: MENU' });
						})
					)
			)
		);
	});

	// ! LIBRARY RENAME.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly libraryRename$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(LIBRARY_RENAME),
			exhaustMap((action) =>
				this._core
					.mutation<IuLibraryRenameResponse['data']>(MUTATION_LIBRARY_RENAME, { library: action.library, user: 1, title: action.title })
					.pipe(
						map((res) => LIBRARY_RENAMED({ tLibrary: action.tLibrary, title: action.title, status: res.uLibraryRename })),
						catchError(() => of({ type: '[ERROR_LIBRARY]: RENAME' }))
					)
			)
		);
	});

	// ! LIBRARY MINIATURES.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly libraryMiniatures$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(LIBRARY_MINIATURES_LOAD),
			exhaustMap((action) =>
				this._core
					.query<IgLibraryMiniaturesResponse['data']>(QUERY_LIBRARY_MINIATURES, { user: 1, library: action.library, detail: action.detail })
					.pipe(
						map((res) => {
							if (res.gLibraryMiniatures.operation === 0) {
								// ! REDIRIGIR A PÁGINA DE PRIVACIDAD.
								return { type: '[ERROR_LIBRARY]: MINIATURES - OPERATION 0' };
							} else {
								return LIBRARY_MINIATURES_LOADED({ tLibrary: action.tLibrary, detail: action.detail, res });
							}
						}),
						catchError(() => {
							// ! REDIRIGIR A 404.
							return of({ type: '[ERROR_LIBRARY]: MINIATURES' });
						})
					)
			)
		);
	});

	// ! LIBRARY MINIATURES UPDATE.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly libraryMiniaturesUpdate$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(LIBRARY_MINIATURES_UPDATE),
			exhaustMap((action) => {
				const header: string = action.header.join(' ');
				const title: string = action.title.join(' ');
				const subtitle: string = action.subtitle.join(' ');
				return this._core
					.mutation<IuLibraryMiniaturesResponse['data']>(MUTATION_LIBRARY_MINIATURES, { library: action.library, header, title, subtitle })
					.pipe(
						map(() =>
							LIBRARY_MINIATURES_UPDATED({
								tLibrary: action.tLibrary,
								props: action.props,
								header: action.header,
								title: action.title,
								subtitle: action.subtitle
							})
						),
						catchError(() => of({ type: '[ERROR_LIBRARY]: MINIATURES' }))
					);
			})
		);
	});

	// ! COLLECTION VIEW.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly collectionView$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(COLLECTION_VIEW_LOAD),
			exhaustMap((action) =>
				this._core
					.get<
						IgCollectionResponse,
						IgCollectionRequest
					>('/library-collection/gCollection', { userId: 1, libraryId: 1, collectionId: action.collection })
					.pipe(
						map((res) => {
							if (res.operation === 0) {
								// ! REDIRIGIR A PÁGINA DE PRIVACIDAD.
								return { type: '[ERROR_COLLECTION]: GET VIEW - OPERATION 0' };
							} else {
								return COLLECTION_VIEW_LOADED({ tLibrary: action.tLibrary, collection: action.collection, res });
							}
						}),
						catchError(() => {
							this._core.redirect(`admin/sell/libraries/${action.tLibrary}/${action.library}/collection/${action.collection}/not-found`);
							return of({ type: '[ERROR_COLLECTION]: GET VIEW' });
						})
					)
			)
		);
	});

	// ! COLLECTION ELEMENTS.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly collectionElements$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(COLLECTION_ELEMENTS_LOAD),
			exhaustMap((action) =>
				this._core
					.get<
						IgCollectionElementsResponse,
						IgCollectionElementsRequest
					>('/library-collection/gCollectionElements', { collectionId: action.collection, page: action.page })
					.pipe(
						map((res) => COLLECTION_ELEMENTS_LOADED({ tLibrary: action.tLibrary, collection: action.collection, res })),
						catchError(() => of({ type: '[ERROR_COLLECTION]: ELEMENTS' }))
					)
			)
		);
	});

	// ! COLLECTION MENU.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly collectionMenu$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(COLLECTION_MENU_LOAD),
			exhaustMap((action) =>
				this._core
					.query<
						IgCollectionConfigurationResponse['data']
					>(QUERY_COLLECTION_MENU, { user: 1, library: action.library, collection: action.collection, detail: action.detail })
					.pipe(
						map((res) => {
							if (res.gCollectionConfiguration.operation === 0) {
								// ! REDIRIGIR A PÁGINA DE PRIVACIDAD.
								return { type: '[ERROR_COLLECTION]: MENU - OPERATION 0' };
							} else {
								return COLLECTION_MENU_LOADED({ tLibrary: action.tLibrary, collection: action.collection, detail: action.detail, res });
							}
						}),
						catchError(() => {
							this._core.redirect(`admin/sell/libraries/${action.tLibrary}/${action.library}/collection/${action.collection}/not-found`);
							return of({ type: '[ERROR_COLLECTION]: GET MENU' });
						})
					)
			)
		);
	});

	// ! COLLECTION RENAME.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly collectionRename$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(COLLECTION_RENAME),
			exhaustMap((action) =>
				this._core
					.mutation<
						IuCollectionRenameResponse['data']
					>(MUTATION_COLLECTION_RENAME, { library: action.library, collection: action.collection, title: action.title })
					.pipe(
						map((res) =>
							COLLECTION_RENAMED({
								tLibrary: action.tLibrary,
								collection: action.collection,
								title: action.title,
								status: res.uCollectionRename
							})
						),
						catchError(() => of({ type: '[ERROR_LIBRARY]: RENAME' }))
					)
			)
		);
	});

	// ! COLLECTION CREATE.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly collectionCreate$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(COLLECTION_CREATE),
			exhaustMap((action) =>
				this._core.post<IcCollectionResponse, IcCollectionRequest>('/library-collection/cCollection', { libraryId: 1 }).pipe(
					map((res) => {
						this._core.redirect(`/libraries/${action.tLibrary}/${action.library}/collection/${res.id}/home`);
						return COLLECTION_CREATED({ tLibrary: action.tLibrary, res });
					}),
					catchError(() => of({ type: '[ERROR_COLLECTION]: CREATE' }))
				)
			)
		);
	});

	// ! COLLECTION CREATE REF.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly collectionCreateRef$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(COLLECTION_CREATE_REF),
			exhaustMap((action) =>
				this._core
					.post<
						IcCollectionResponse,
						IcCollectionRefRequest
					>('/library-collection/cCollectionRef', { userId: 1, libraryId: action.library, collectionId: action.collection })
					.pipe(
						map((res) => {
							this._core.redirect(`/libraries/${action.tLibrary}/${action.library}/collection/${res.id}/home`);
							return COLLECTION_CREATED({ tLibrary: action.tLibrary, res });
						}),
						catchError(() => of({ type: '[ERROR_COLLECTION]: CREATE REF' }))
					)
			)
		);
	});

	// ! COLLECTION DELETE.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly collectionDelete$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(COLLECTION_DELETE),
			exhaustMap((action) =>
				this._core.mutation<IdCollectionResponse['data']>(MUTATION_COLLECTION_DELETE, { collection: action.collection }).pipe(
					map((res) => {
						if (res.dCollection === 0) {
							// ! REDIRIGIR A PÁGINA DE ERROR.
							return { type: '[ERROR_COLLECTION]: DELETE - OPERATION 0' };
						} else {
							this._core.redirect(`/libraries/${action.tLibrary}/${action.library}/home`);
							return COLLECTION_DELETED({ tLibrary: action.tLibrary, collection: action.collection });
						}
					}),
					catchError(() => of({ type: '[ERROR_COLLECTION]: DELETE' }))
				)
			)
		);
	});

	// ! COLLECTION MINIATURES.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly collectionMiniatures$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(COLLECTION_MINIATURES_LOAD),
			exhaustMap((action) =>
				this._core
					.query<
						IgCollectionMiniaturesResponse['data']
					>(QUERY_COLLECTION_MINIATURES, { user: 1, library: action.library, collection: action.collection, detail: action.detail })
					.pipe(
						map((res) => {
							if (res.gCollectionMiniature.operation === 0) {
								// ! REDIRIGIR A PÁGINA DE PRIVACIDAD.
								return { type: '[ERROR_COLLECTION]: MINIATURES - OPERATION 0' };
							} else {
								return COLLECTION_MINIATURES_LOADED({
									tLibrary: action.tLibrary,
									collection: action.collection,
									detail: action.detail,
									res
								});
							}
						}),
						catchError(() => {
							this._core.redirect(`admin/sell/libraries/${action.tLibrary}/${action.library}/collection/${action.collection}/not-found`);
							return of({ type: '[ERROR_COLLECTION]: GET MINIATURES' });
						})
					)
			)
		);
	});

	// ! COLLECTION MINIATURES UPDATE.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly collectionMiniaturesUpdate$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(COLLECTION_MINIATURES_UPDATE),
			exhaustMap((action) => {
				const header: string = action.header.join(' ');
				const title: string = action.title.join(' ');
				const subtitle: string = action.subtitle.join(' ');
				return this._core
					.mutation<IuCollectionMiniatureResponse['data']>(MUTATION_COLLECTION_MINIATURES, {
						collection: action.collection,
						header,
						title,
						subtitle
					})
					.pipe(
						map(() =>
							COLLECTION_MINIATURES_UPDATED({
								tLibrary: action.tLibrary,
								collection: action.collection,
								header: action.header,
								title: action.title,
								subtitle: action.subtitle
							})
						),
						catchError(() => of({ type: '[ERROR_COLLECTION]: MINIATURES' }))
					);
			})
		);
	});
}
