// * Consts.
import { LOADED } from '@consts/load.const';
import { LIBRARY_BTNS } from '@libraries/constants/libraries.const';

// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';
import { ICollection, ILibrary } from '@libraries/interfaces/libraries.interface';
import { IgAdminSellLibraryResponse } from '@libraries/state/libraries.response';

// * Sorts.
import { TMiniature } from '@libraries/sorts/libraries.sort';

export function uLibrary(state: ILibrary[], res: IgAdminSellLibraryResponse): ILibrary[] {
	const LIBRARY: ILibrary = {
		status: LOADED,
		id: res.id,
		title: res.title,
		multimedia: res.multimedia,
		collections: res.collections.map((collection) => {
			const HEADERBOARD: TMiniature[] = collection.miniatureHeader as TMiniature[];
			const TITLE: TMiniature[] = collection.miniatureTitle as TMiniature[];
			const SUBTITLE: TMiniature[] = collection.miniatureSubtitle as TMiniature[];

			let style: string = '';

			if (HEADERBOARD.length > 0 || TITLE.length > 0 || SUBTITLE.length > 0) style = 'grid-template-rows: 1fr';

			if (
				(HEADERBOARD.length > 0 && TITLE.length > 0) ||
				(HEADERBOARD.length > 0 && SUBTITLE.length > 0) ||
				(TITLE.length > 0 && SUBTITLE.length > 0)
			)
				style = 'grid-template-rows: 2fr';

			if (HEADERBOARD.length > 0 && TITLE.length > 0 && SUBTITLE.length > 0) style = 'grid-template-rows: max-content 1fr max-content';

			return {
				status: LOADED,
				data: {
					id: collection.id,
					title: collection.title,
					miniature: {
						headerboard: HEADERBOARD,
						title: TITLE,
						subtitle: SUBTITLE,
						style
					},
					conf: null,
					elements: collection.items,
					count: collection.count
				}
			};
		}),
		default: null,
		selected: null,
		count: res.count,
		button: LIBRARY_BTNS[res.type - 1],
		type: res.type
	};

	if (!Array.isArray(state) || state.length === 0) {
		return [LIBRARY];
	}

	const LIBRARIES: ILibrary[] = [...state];

	if (state.length > 0) {
		const INDEX: number = LIBRARIES.findIndex((library: ILibrary) => library.id === res.id);

		if (INDEX > 0) {
			LIBRARY.default = LIBRARIES[INDEX].default;
			LIBRARY.selected = LIBRARIES[INDEX].selected;

			if (LIBRARIES[INDEX].collections.length > 0) {
				const COLLECTIONS: ILibrary['collections'] = LIBRARIES[INDEX].collections;

				LIBRARY.collections = LIBRARY.collections.map((item) => {
					const COLLECTION: ILoadableEntity<ICollection> | undefined = COLLECTIONS.find(
						(collection) => collection.data.id === item.data.id
					);
					return COLLECTION ? COLLECTION : item;
				});
			} else {
				LIBRARIES.push(LIBRARY);
			}
		}
	} else {
		LIBRARIES.push(LIBRARY);
	}

	return LIBRARIES;
}
