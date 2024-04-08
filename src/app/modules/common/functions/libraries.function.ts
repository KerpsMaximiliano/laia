// * Consts.
// * COMMON.
import { LIBRARY_BTNS, LIBRARY_FOOTER } from '@app/modules/common/constants/library.const';
import { COLLECTION_BTNS } from '@common/constants/collection.const';
// * CORE.
import { COMPLETE, LOADED } from '@consts/load.const';

// * Interfaces.
// * COMMON.
import { ICollection } from '@common/interfaces/collection.interface';
import { ILibrary } from '@common/interfaces/libraries.interface';
// * CORE.
import { ILoadableEntity } from '@interfaces/load.interface';

// * Responses.
import { ILibraryResponse } from '@common/state/common.response';

// * Sorts.
import { TMiniature } from '@common/sorts/common.sort';

export function transformLibrary(state: ILibrary[], res: ILibraryResponse): ILibrary[] {
	const LIBRARY: ILibrary = {
		status: COMPLETE,
		id: res.id,
		title: res.title,
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
					count: collection.count,
					button: COLLECTION_BTNS[res.type - 1][0],
					footer: LIBRARY_FOOTER[res.type - 1]
				}
			};
		}),
		selected: null,
		count: res.count,
		conf: null,
		button: LIBRARY_BTNS[res.type - 1][0],
		footer: LIBRARY_FOOTER[res.type - 1]
	};

	if (!Array.isArray(state) || state.length === 0) return [LIBRARY];

	const LIBRARIES: ILibrary[] = { ...state };

	const INDEX: number = LIBRARIES.findIndex((library: ILibrary) => library.id === res.id);

	if (INDEX !== -1) {
		LIBRARY.conf = LIBRARIES[INDEX].conf;
		LIBRARY.selected = LIBRARIES[INDEX].selected;

		if (LIBRARIES[INDEX].collections.length > 0) {
			LIBRARY.collections = LIBRARY.collections.map((item) => {
				const COLLECTION: ILoadableEntity<ICollection> | undefined = state[INDEX].collections.find(
					(collection) => collection.data.id === item.data.id
				);
				return COLLECTION ? COLLECTION : item;
			});
		} else {
			LIBRARIES.push(LIBRARY);
		}
	}

	return LIBRARIES;
}
