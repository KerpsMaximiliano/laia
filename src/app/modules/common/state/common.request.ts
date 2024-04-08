// ! LIBRARY.
export interface ILibraryRequest {
	userId: number;
	libraryId: number;
}

// ! COLLECTION.
export interface ICollectionRequest {
	collectionId: number;
	page: number;
}
