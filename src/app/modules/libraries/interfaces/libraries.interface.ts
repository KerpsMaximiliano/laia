// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';

// * Sorts.
import { ILoading } from '@sorts/loading.sort';

// * LIBRARIES INTERFACE.
export interface ILibraries {
	buyers: ILibrary<IBuyer>; // * Library buyers.
}

// * LIBRARY INTERFACE.
export interface ILibrary<T> {
	title: string; // * Title of the library.
	conf: number; // * Configuration of the library.
	miniature: string; // * Miniature of the library.
	status: ILoading; // * Status of the library.
	collections: ILoadableEntity<ICollection<T>>[]; // * Collections of the library.
}

// * COLLECTION INTERFACE.
export interface ICollection<T> {
	id: number; // * ID of the collection.
	title: string; // * Title of the collection.
	miniature: string; // * Miniature of the collection.
	elements: T[]; // * Items of the collection.
}

// * LIBRARY BUYER INTERFACE.
export interface IBuyer {
	id: number; // * ID of the buyer.
	name: string; // * Name of the buyer.
	avatar: string; // * Avatar of the buyer.
}

// * LIBRARY ... INTERFACE.
