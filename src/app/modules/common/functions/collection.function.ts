// * Consts.
// * COMMON.
import { COLLECTION_BTNS, COLLECTION_FOOTER } from '@common/constants/collection.const';
import { AUX_LIBRARY } from '@common/constants/library.const';
// * CORE.
import { LOADED } from '@consts/load.const';

// * Interfaces.
// * COMMON.
import { ICollection } from '@common/interfaces/collection.interface';
import { ILibrary } from '@common/interfaces/libraries.interface';
// * CORE.
import { ILoadableEntity } from '@interfaces/load.interface';

// * Responses.
import { ICollectionResponse } from '@common/state/common.response';

// * Sorts.
import { TMiniature } from '@common/sorts/common.sort';

export function transformCollection(state: ILibrary[], res: ICollectionResponse): ILibrary[] {
	const HEADERBOARD: TMiniature[] = res.collection.miniatureHeader as TMiniature[];
	const TITLE: TMiniature[] = res.collection.miniatureTitle as TMiniature[];
	const SUBTITLE: TMiniature[] = res.collection.miniatureSubtitle as TMiniature[];

	let style: string = '';

	if (HEADERBOARD.length > 0 || TITLE.length > 0 || SUBTITLE.length > 0) style = 'grid-template-rows: 1fr';

	if (
		(HEADERBOARD.length > 0 && TITLE.length > 0) ||
		(HEADERBOARD.length > 0 && SUBTITLE.length > 0) ||
		(TITLE.length > 0 && SUBTITLE.length > 0)
	)
		style = 'grid-template-rows: 2fr';

	if (HEADERBOARD.length > 0 && TITLE.length > 0 && SUBTITLE.length > 0) style = 'grid-template-rows: max-content 1fr max-content';

	const COLLECTION: ILoadableEntity<ICollection> = {
		status: LOADED,
		data: {
			id: res.collection.id,
			title: res.collection.title,
			miniature: {
				headerboard: HEADERBOARD,
				title: TITLE,
				subtitle: SUBTITLE,
				style
			},
			conf: null,
			elements: res.collection.items,
			count: res.collection.count,
			button: COLLECTION_BTNS[res.type - 1][0],
			footer: COLLECTION_FOOTER[res.type - 1]
		}
	};

	const LIBRARY: ILibrary = { ...AUX_LIBRARY, collections: [COLLECTION] };

	if (!Array.isArray(state) || state.length === 0) return [LIBRARY];

	const LIBRARY_INDEX: number = state.findIndex((lib) => lib.id === res.id);

	if (LIBRARY_INDEX === -1) return [...state, LIBRARY];

	const LIBRARIES: ILibrary[] = [...state];

	if (!Array.isArray(LIBRARIES[LIBRARY_INDEX].collections) || LIBRARIES[LIBRARY_INDEX].collections.length === 0)
		return [...LIBRARIES, { ...LIBRARIES[LIBRARY_INDEX], collections: [COLLECTION] }];

	const COLLECTION_INDEX: number = LIBRARIES[LIBRARY_INDEX].collections.findIndex((collection) => collection.data.id === res.collection.id);

	if (COLLECTION_INDEX === -1)
		return [...LIBRARIES, { ...LIBRARIES[LIBRARY_INDEX], collections: [...LIBRARIES[LIBRARY_INDEX].collections, COLLECTION] }];

	COLLECTION.data.conf = LIBRARIES[LIBRARY_INDEX].collections[COLLECTION_INDEX].data.conf;

	LIBRARIES[LIBRARY_INDEX].collections[COLLECTION_INDEX] = COLLECTION;

	return LIBRARIES;
}
