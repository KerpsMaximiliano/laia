// * Interfaces.
import { IResponse } from '@interfaces/response.interface';

// * Sorts.
import { TCollections, TMiniature } from '@common/sorts/common.sort';

// ! gLibrary() - REST API.
export interface IgLibraryResponse {
	id: number;
	title: string;
	count: number;
	collections: {
		id: number;
		title: string;
		miniatureHeader: TMiniature[];
		miniatureTitle: TMiniature[];
		miniatureSubtitle: TMiniature[];
		items: TCollections[];
		count: number;
	}[];
	operation: number;
}

// ! gLibraryConfiguration()
interface IgLibraryConfiguration {
	title: string;
	conf: number;
	operation: number;
}

export type IgLibraryConfigurationResponse = IResponse<{ gLibraryConf: IgLibraryConfiguration }>;

// ! uLibraryRename()
export type IuLibraryRenameResponse = IResponse<{ uLibraryRename: number }>;

// ! gLibraryMiniatures()
interface IgLibraryMiniatures {
	miniatureProps: TMiniature[];
	miniatureHeader: TMiniature[];
	miniatureTitle: TMiniature[];
	miniatureSubtitle: TMiniature[];
	operation: number;
}

export type IgLibraryMiniaturesResponse = IResponse<{ gLibraryMiniatures: IgLibraryMiniatures }>;

// ! uLibraryMiniatures()
export type IuLibraryMiniaturesResponse = IResponse<{ uLibraryMiniatures: number }>;
