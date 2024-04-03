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

// !AUX
export const data: ILibrary = {
	name: 'Compradores',
	disminutive: 'Comprador',
	book: [
		{
			redirect: 'miniatures', //! ENUM
			footer: null,
			header: 'Con Compras Recientes', // Header text
			items: [
				{
					headerboard: '1 paquete.', // Cabecera
					title: 'Las Rosas', // Titulo
					subtitle: '$15.000', // Subtitulo
					image:
						'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_1.png?alt=media&token=388cefde-efc9-495f-81de-ba935b304132', // Imagen
					icon: null,
					check: null,
					cInfo: 'grid-template-rows: max-content 1fr max-content'
				},
				{
					headerboard: 'TExtoTExtoTExto TExtoTExtoTExto TExtoTExtoTE xto',
					title: 'TExtoTExtoTExto TExtoTExtoTExto TExtoTExtoTE xto',
					subtitle: 'TExtoTExtoTExto TExtoTExtoTExto TExtoTExtoTE xto',
					icon: 'calendar_month',
					image: null,
					check: null,
					cInfo: 'grid-template-rows: max-content 1fr max-content'
				},
				{
					headerboard: null,
					title: 'Titulooo',
					subtitle: 'Subtituloo',
					icon: null,
					check: null,
					image: null,
					cInfo: 'grid-template-rows: repeat(2, 1fr)'
				},
				{
					headerboard: null,
					title: 'Solo title',
					subtitle: null,
					icon: null,
					check: null,
					image: null,
					cInfo: 'grid-template-rows: 1fr'
				},
				{
					headerboard: 'Solo cabecera',
					title: null,
					subtitle: null,
					icon: null,
					check: null,
					image: null,
					cInfo: 'grid-template-rows: 1fr'
				},
				{
					headerboard: null,
					title: null,
					subtitle: 'Solo subtitle',
					icon: null,
					check: null,
					image: null,
					cInfo: 'grid-template-rows: 1fr'
				}
			],
			config: {
				checkbox: 1,
				multiple: 0,
				footer: 1
			}
		}
		// {
		// 	redirect: 'miniatures',
		// 	footer: null,
		// 	header: 'Con Compras Recientes', // Header text
		// 	items: [
		// 		{
		// 			headerboard: 'Hola', // Cabecera
		// 			title: 'Hola', // Titulo
		// 			subtitle: 'Hola', // Subtitulo
		// 			image:
		// 				'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_1.png?alt=media&token=388cefde-efc9-495f-81de-ba935b304132', // Imagen
		// 			icon: null, // Icono en caso que no tenga imagen
		// 			check: null // Si esta checkeado o no
		// 		},
		// 		{
		// 			headerboard: 'Hola',
		// 			title: 'Hola',
		// 			subtitle: 'Hola',
		// 			icon: 'calendar_month',
		// 			image: null,
		// 			check: null
		// 		},
		// 		{
		// 			headerboard: 'Hola',
		// 			title: 'Hola',
		// 			subtitle: 'Hola',
		// 			icon: null,
		// 			check: null,
		// 			image: null
		// 		},
		// 		{
		// 			headerboard: null,
		// 			title: 'Solo title',
		// 			subtitle: null,
		// 			icon: null,
		// 			check: null,
		// 			image: null
		// 		},
		// 		{
		// 			headerboard: 'Solo cabecera',
		// 			title: null,
		// 			subtitle: null,
		// 			icon: null,
		// 			check: null,
		// 			image: null
		// 		},
		// 		{
		// 			headerboard: null,
		// 			title: null,
		// 			subtitle: 'Solo subtitle',
		// 			icon: null,
		// 			check: null,
		// 			image: null
		// 		}
		// ],
		// config: {
		// 	checkbox: 0,
		// 	multiple: 0,
		// 	footer: 0
		// }
		// }
	]
};
