// * Interfaces.
import { IResponse } from '@interfaces/response.interface';

// * Sorts.
import { TCollection } from '@common/sorts/common.sort';

// ! LIBRARY.
export interface ILibraryResponse {
	id: number;
	collections: {
		id: number;
		title: string;
		miniatureHeader: string[];
		miniatureTitle: string[];
		miniatureSubtitle: string[];
		items: TCollection[];
		count: number;
	}[];
	multimedia: number; // ! DELETE THIS.
	title: string;
	type: number;
	count: number;
}

// ! LIBRARY RENAME.
export type ILibraryRenameResponse = IResponse<{ uAdminSellLibraryRename: number }>;

// ! COLLECTION.
export interface ICollectionResponse {
	id: number;
	type: number;
	collection: {
		id: number;
		title: string;
		miniatureHeader: string[];
		miniatureTitle: string[];
		miniatureSubtitle: string[];
		items: TCollection[];
		count: number;
	};
}

export interface ICollectionElementsResponse {
	items: TCollection[];
}
