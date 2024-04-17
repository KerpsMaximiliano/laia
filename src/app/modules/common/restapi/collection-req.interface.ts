interface IRequestCollection {
	userId: number;
	libraryId: number;
	collectionId: number;
}

// ! cCollection()
export interface IcCollectionRequest {
	libraryId: number;
}

// ! gCollection()
export type IgCollectionRequest = IRequestCollection;

// ! gCollectionElements()
export interface IgCollectionElementsRequest {
	collectionId: number;
	page: number;
}

// ! cCollectionRef()
export type IcCollectionRefRequest = IRequestCollection;
