// * Interfaces.
import { ILoadableEntities, ILoadableEntity } from '@interfaces/load.interface';
import { IArticle } from './sell-article.interface';
import { IOrder } from './sell-order.interface';

export interface ISell {
	articles: ILoadableEntities<ILoadableEntity<IArticle>>;
	article: ILoadableEntity<IArticle>;
	order: ILoadableEntity<IOrder>;
}

// ! Biblioteca
export interface ILibrary {
	name: string; // Nombre que va en el header, por ej: "Compradores"
	disminutive: string; // Nombre para el boton de añadir, por ejemplo "Comprador"
	book: IBook[];
}

// Interface de cada expandible
export interface IBook {
	redirect: 'miniatures';
	items: IItems[];
	config: IConfig;
	header: string | null;
	footer: string | null;
}

// Interface de cada item del expandible
export interface IItems {
	headerboard: string | null;
	title: string | null;
	subtitle: string | null;
	image: string | null;
	icon: string | null;
	check: number | null;
	cInfo: string; // ? Ref(1)
}

/**
 * ? Ref(1):
 * Cantidad de filas de información.
 * > (headerboard || title || subtitle): 1fr;
 * > (headerboard && title || headerboard && subtitle || title && subtitle): 2fr;
 * > headerboard && title && subtitle: max-content 1fr max-content;
 */

// Configuracion del expandible
export interface IConfig {
	checkbox: number;
	multiple: number;
	footer: number;
}
