// * Interfaces.
import { IButton } from './util.interface';

// * Sorts.
import { TCollection, TMiniature } from '@common/sorts/common.sort';

// * COLLECTION INTERFACE.
export interface ICollection {
	id: number;
	title: string;
	miniature: IMinuature;
	conf: {
		default: number;
		order: {
			title: string;
			type: number;
		};
	} | null;
	elements: TCollection[];
	count: number;
	button: IButton;
	footer: string;
}

// ! UTIL.
interface IMinuature {
	headerboard: TMiniature[];
	title: TMiniature[];
	subtitle: TMiniature[];
	style: string;
}

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
