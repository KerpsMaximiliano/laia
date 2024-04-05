import { createReducer, on } from '@ngrx/store';

// * STATE - Const.
import { LIBRARIES_STATE } from './libraries.state';

// * Consts.

// * Interfaces.
import { ILibraries } from '@libraries/interfaces/libraries.interface';

// * Actions.
import { COMPLETE, LOADED } from '../../../core/constants/load.const';
import { TLibrary, TMiniature } from '../sorts/libraries.sort';
import { LIBRARY_LOAD, LIBRARY_LOADED, LIBRARY_SELECT_ELEMENT } from './libraries.actions';

const libraries: TLibrary[] = ['buyers'];

export const LIBRERIES_REDUCERS = createReducer(
	// * INITIAL STATE.
	LIBRARIES_STATE,
	on(LIBRARY_LOAD, (state): ILibraries => state),
	on(LIBRARY_LOADED, (state, { id, res }): ILibraries => {
		const tLibrary: TLibrary = libraries[res.type - 1];
		return {
			...state,
			[tLibrary]: {
				...state[tLibrary],
				status: COMPLETE,
				id,
				title: res.title,
				disminutive: '', // ! <= Llegaria desde el back.
				multimedias: 0, // ! <= Llegaria desde el back.
				collections: res.collections.map((collection) => {
					const parts: string[] = collection.miniature.split('-');
					const headerboard: TMiniature[] = parts[0].split(' ') as TMiniature[];
					const title: TMiniature[] = parts[1].split(' ') as TMiniature[];
					const subtitle: TMiniature[] = parts[2].split(' ') as TMiniature[];
					let style: string = '';

					if (headerboard.length > 0 || title.length > 0 || subtitle.length > 0) style = 'grid-template-rows: 1fr';
					if (
						(headerboard.length > 0 && title.length > 0) ||
						(headerboard.length > 0 && subtitle.length > 0) ||
						(title.length > 0 && subtitle.length > 0)
					)
						style = 'grid-template-rows: 2fr';
					if (headerboard.length > 0 && title.length > 0 && subtitle.length > 0) style = 'grid-template-rows: max-content 1fr max-content';

					return {
						status: LOADED,
						data: {
							id: collection.id,
							title: collection.title,
							miniature: {
								headerboard,
								title,
								subtitle,
								style
							},
							conf: state[tLibrary].collections.find((item) => item.data.id === collection.id)?.data.conf || null,
							elements: collection.items
						}
					};
				})
			}
		};
	}),
	on(
		LIBRARY_SELECT_ELEMENT,
		(state, { id, library }): ILibraries => ({
			...state,
			[library]: {
				...state[library],
				selected: id
			}
		})
	)
);
