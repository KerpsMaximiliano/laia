import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

// * Requests.
import { ICollectionRequest, ILibraryRequest } from './common.request';

// * Responses.
import { ICollectionResponse, ILibraryRenameResponse, ILibraryResponse } from './common.response';

// * Services.
import { CoreService } from '@services/core.service';

// * Actions.
import { COLLECTION_LOAD, COLLECTION_LOADED, LIBRARY_LOAD, LIBRARY_LOADED, LIBRARY_RENAME, LIBRARY_RENAMED } from './common.actions';

// * GraphQl.
import { MUTATION_LIBRARY_RENAME } from './common.graphql';

@Injectable({ providedIn: 'root' })
export class CommonEffects {
	private readonly _actions$: Actions = inject(Actions);
	private readonly _core: CoreService = inject(CoreService);

	// ! LIBRARY.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly library$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(LIBRARY_LOAD),
			exhaustMap((action) =>
				this._core
					.get<ILibraryResponse, ILibraryRequest>('/library/gAdminSellLibrary', {
						userId: 1, // ! Esta hardcodeado el user ID.
						libraryId: action.library
					})
					.pipe(
						map((res) => LIBRARY_LOADED({ res })),
						catchError(() => of({ type: '[ERROR_LIBRARY]: GET' }))
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
					.mutation<ILibraryRenameResponse['data']>(MUTATION_LIBRARY_RENAME, { library: action.library, user: 1, title: action.title })
					.pipe(
						map((res) => LIBRARY_RENAMED({ library: action.library, title: action.title, status: res.uAdminSellLibraryRename })),
						catchError(() => of({ type: '[ERROR_LIBRARY]: RENAME' }))
					)
			)
		);
	});

	// ! COLLECTION.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly collection$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(COLLECTION_LOAD),
			exhaustMap((action) =>
				this._core
					.get<
						ICollectionResponse,
						ICollectionRequest
					>('/library-collection/gAdminSellCollection', { collectionId: action.collection, page: 1 })
					.pipe(
						map((res) => COLLECTION_LOADED({ res })),
						catchError(() => of({ type: '[ERROR_COLLECTION]: GET' }))
					)
			)
		);
	});
}
