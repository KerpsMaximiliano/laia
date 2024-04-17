// * Interfaces.
import { IResponse } from '@interfaces/response.interface';

// * Sorts.
import { TCollections, TMiniature } from '@common/sorts/common.sort';

// ! gCollection()
export interface IgCollectionResponse {
	collection: {
		title: string;
		miniatureHeader: TMiniature[];
		miniatureTitle: TMiniature[];
		miniatureSubtitle: TMiniature[];
		items: TCollections[];
		count: number;
	};
	operation: number;
}

// ! gCollectionElements()
export interface IgCollectionElementsResponse {
	items: TCollections[];
}

// ! gCollectionConfiguration()
interface IgCollectionConfiguration {
	title: string;
	conf: number;
	ascDesc: number;
	order: string;
	filter: {
		id: number;
		alias: string;
	};
	operation: number;
}

export type IgCollectionConfigurationResponse = IResponse<{ gCollectionConfiguration: IgCollectionConfiguration }>;

// ! uCollectionRename()
export type IuCollectionRenameResponse = IResponse<{ uCollectionRename: number }>;

interface IcCollection {
	id: number;
	title: string;
	miniatureHeader: TMiniature[];
	miniatureTitle: TMiniature[];
	miniatureSubtitle: TMiniature[];
	items: TCollections[];
	count: number;
}

// ! cCollection()
// ! cCollectionRef()
export type IcCollectionResponse = IcCollection;

// ! dCollection()
export type IdCollectionResponse = IResponse<{ dCollection: number }>;

// ! gCollectionOrder()
export interface IgCollectionOrderResponse {
	ascDsc: number;
	orderProps: string[];
	operation: number;
}

// ! uCollectionOrder()
export type IuCollectionOrderResponse = IResponse<{ uCollectionOrder: number }>;

// ! gCollectionMiniature()
interface IgCollectionMiniatures {
	title: string;
	operation: number;
	collectionMiniature: {
		id: number;
		miniatureProps: TMiniature[];
		miniatureHeader: TMiniature[];
		miniatureTitle: TMiniature[];
		miniatureSubtitle: TMiniature[];
	};
}

export type IgCollectionMiniaturesResponse = IResponse<{ gCollectionMiniature: IgCollectionMiniatures }>;

// ! uCollectionMiniature()
export type IuCollectionMiniatureResponse = IResponse<{ uCollectionMiniature: number }>;

// ! gCollectionFilter()
// operation: number;

// ! uCollectionFilter()
