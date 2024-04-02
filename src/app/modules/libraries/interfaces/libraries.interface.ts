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
	id: number; // * ID of the library.
	title: string; // * Title of the library.
	modified: number; // * Modified of the library.
	status: ILoading; // * Status of the library.
	collections: ILoadableEntity<ICollection<T>>[]; // * Collections of the library.
}

// * COLLECTION INTERFACE.
export interface ICollection<T> {
	id: number; // * ID of the collection.
	title: string; // * Title of the collection.
	miniature: string; // * Miniature of the collection.
	conf: {
		default: number; // * Default of the collection: 0: No. 1: Yes.
		order: {
			title: string; // * Title of the ordering.
			type: number; // * Order of the collection: 0: DSC. 1: ASC.
		};
		/**
		 * ! Las opciones de filtrado depende de la colección.
		 * ! Si la colección es por defecto, esta solo se puede duplicar.
		 * ! Las colecciones personalizadas también se pueden duplicar,
		 * ! pero además se puede modificar su filtrado, orden, tipo de orden y además de eliminarla.
		 * ! Hablar esto con Ignacio.
		 * filter: {
		 *   title: string;
		 * }
		 * acciones:
		 *  => duplicar
		 *  => eliminar
		 *  => modificar
		 */
	};
	elements: T[]; // * Items of the collection.
}

// * LIBRARY BUYER INTERFACE.
export interface IBuyer {
	id: number; // * ID of the buyer.
	name: string; // * Name of the buyer.
	avatar: string; // * Avatar of the buyer.
}

// * LIBRARY ... INTERFACE.
