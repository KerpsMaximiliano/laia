// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';

// * Sorts.
import { TCollection, TMiniature } from '@libraries/sorts/libraries.sort';
import { ILoading } from '@sorts/loading.sort';

// * LIBRARY INTERFACE.
export interface ILibrary {
	status: ILoading;
	id: number;
	title: string;
	multimedia: number;
	collections: ILoadableEntity<ICollection>[];
	default: number | null;
	selected: number | null;
	count: number;
	button: ILibraryButton[];
	type: number;
}

// * COLLECTION INTERFACE.
export interface ICollection {
	id: number;
	title: string;
	miniature: IMinuature;
	conf: IConf | null;
	elements: TCollection[];
	count: number;
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

export interface ILibraryButton {
	label: string;
	action: string;
	visibility: boolean;
}

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

// * LIBRARY CONFIRMATION INTERFACE.
export interface ILibraryConf {
	status: ILoading;
	title: string;
	default: number | null;
	button: ILibraryButton;
}
