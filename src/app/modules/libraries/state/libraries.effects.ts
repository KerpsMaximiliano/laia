import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

// * Consts.
import { LOADED } from '@consts/load.const';

// * Requests.
import { IgAdminSellLibraryRequest } from './libraries.request';

// * Responses.
import { IgAdminSellLibraryResponse } from './libraries.response';

// * Services.
import { CoreService } from '@services/core.service';

// * Sorts.
import { ILoading } from '@sorts/loading.sort';

// * Actions.
import { LIBRARY_LOAD, LIBRARY_LOADED } from './libraries.actions';

@Injectable({ providedIn: 'root' })
export class Librariesffects {
	private readonly _actions$: Actions = inject(Actions);
	private readonly _core: CoreService = inject(CoreService);
	private readonly _loaded: ILoading = LOADED;

	// ! LIBRARY.
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly library$ = createEffect(() => {
		return this._actions$.pipe(
			ofType(LIBRARY_LOAD),
			exhaustMap((action) =>
				this._core
					.get<IgAdminSellLibraryResponse, IgAdminSellLibraryRequest>('/library/gAdminSellLibrary', {
						userId: 1, // ! Esta hardcodeado el user ID.
						libraryId: action.library
					})
					.pipe(
						map((res) => LIBRARY_LOADED({ id: action.library, res })),
						catchError(() => of({ type: '[ERROR_LIBRARY]: GET LIBRARY' }))
					)
			)
		);
	});
}
