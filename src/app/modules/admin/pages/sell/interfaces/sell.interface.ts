// * Interfaces.
import { ILoadableEntities, ILoadableEntity } from '@interfaces/load.interface';

// * Sorts.
import { ILoading } from '@sorts/loading.sort';

export interface ISell {
	articles: ILoadableEntities<ILoadableEntity<IArticle>>;
	article: ILoadableEntity<IArticle>;
}

export interface IArticle {
	id: number;
	medias: { url: string; type: 'IMAGE' | 'VIDEO' }[] | null;
	title: string | null;
	price: { amount: number | null; type: 'USD' };
	stock: { quantity: number | null; type: 'PACKAGE' | 'UNIT' };
	investments: { status: ILoading; items: IInvest[]; total: number };
	commissions: { status: ILoading; items: ICommission[]; total: number };
	hashtag: string | null;
	manufacturing: { time: number | null; type: 'DAY' | 'HOUR' | 'MINUTE' | 'MONTH' };
	segments: { status: ILoading; items: ISegment[]; count: number };
	keywords: { status: ILoading; items: string[]; count: number };
	questions: { status: ILoading; items: IQuestion[]; count: number };
}

interface IInvest {
	id: number;
	amount: number | null;
	title: string | null;
	note: string | null;
}

interface ICommission {
	id: number;
	amount: number | null;
	type: 'AMOUNT' | 'PERCENT';
}

interface ISegment {
	id: number;
	title: string | null;
	description: string | null;
	media: string | null;
}

interface IQuestion {
	id: number;
	question: string | null;
	type: 'CALENDAR' | 'MULTIPLE' | 'TEXT' | 'TIME';
	limit: number;
	required: number;
	options: string[];
}

// ! AUX.
export interface IArt {
	id: number;
	title: string | null;
	media: { url: string; type: 'IMAGE' | 'VIDEO' } | null;
	price: { amount: number | null; type: 'USD' };
	stock: { quantity: number | null; type: 'PACKAGE' | 'UNIT' };
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
}

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
					headerboard: 'Hola', // Cabecera
					title: 'Hola', // Titulo
					subtitle: 'Hola', // Subtitulo
					image:
						'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_1.png?alt=media&token=388cefde-efc9-495f-81de-ba935b304132', // Imagen
					icon: null,
					check: null
				},
				{
					headerboard: 'TExtoTExtoTExto TExtoTExtoTExto TExtoTExtoTE xto',
					title: 'TExtoTExtoTExto TExtoTExtoTExto TExtoTExtoTE xto',
					subtitle: 'TExtoTExtoTExto TExtoTExtoTExto TExtoTExtoTE xto',
					icon: 'calendar_month',
					image: null,
					check: null
				},
				{
					headerboard: null,
					title: 'Titulooo',
					subtitle: 'Subtituloo',
					icon: null,
					check: null,
					image: null
				},
				{
					headerboard: null,
					title: 'Solo title',
					subtitle: null,
					icon: null,
					check: null,
					image: null
				},
				{
					headerboard: 'Solo cabecera',
					title: null,
					subtitle: null,
					icon: null,
					check: null,
					image: null
				},
				{
					headerboard: null,
					title: null,
					subtitle: 'Solo subtitle',
					icon: null,
					check: null,
					image: null
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
