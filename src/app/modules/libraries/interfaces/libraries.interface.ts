// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';

// * Sorts.
import { TCollection, TMiniature } from '@libraries/sorts/libraries.sort';
import { ILoading } from '@sorts/loading.sort';

// * LIBRARIES INTERFACE.
export interface ILibraries {
	buyers: ILibrary;
}

// * LIBRARY INTERFACE.
export interface ILibrary {
	status: ILoading;
	id: number;
	title: string;
	modified: number;
	disminutive: string;
	multimedias: number;
	collections: ILoadableEntity<ICollection>[];
	selected: number | null;
}

// * COLLECTION INTERFACE.
export interface ICollection {
	id: number;
	title: string;
	miniature: IMinuature;
	conf: IConf | null;
	elements: TCollection[];
}

// * LIBRARY BUYER INTERFACE.
export interface IBuyer {
	id: number | null;
	media: string | null;
	name: string | null;
	surname: string | null;
	email: string | null;
	phone: string | null;
}

// * LIBRARY ... INTERFACE.

interface IMinuature {
	headerboard: TMiniature[];
	title: TMiniature[];
	subtitle: TMiniature[];
	style: string;
}

interface IConf {
	default: number;
	order: {
		title: string;
		type: number;
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
}
