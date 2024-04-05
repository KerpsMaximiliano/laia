export interface IConfig {
	name: string;
	items: IItems[];
	footer: IFooter;
	footerItems: IFooter[];
}

interface IFooter {
	text: string[] | string;
	value: number[] | number;
}

export interface IItems {
	id: string;
	headerboard: string | null;
	title: string | null;
	subtitle: string | null;
	image: string;
	check: number;
	cInfo: string;
}

export const data: IConfig = {
	name: 'Compradores Recientes',
	items: [
		{
			id: 'Juan',
			headerboard: 'CabeceraID',
			title: 'TituloID',
			subtitle: 'SubtituloID',
			image:
				'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_8.png?alt=media&token=af858eed-0c0f-4947-9bc4-2eb497f7acdf',
			check: 1,
			cInfo: 'grid-template-rows: max-content 1fr max-content'
		},
		{
			id: 'Miriam',
			headerboard: 'CabeceraID',
			title: 'TituloID',
			subtitle: 'SubtituloID',
			image:
				'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_8.png?alt=media&token=af858eed-0c0f-4947-9bc4-2eb497f7acdf',
			check: 0,
			cInfo: 'grid-template-rows: max-content 1fr max-content'
		},
		{
			id: 'Ese',
			headerboard: 'CabeceraID',
			title: 'TituloID',
			subtitle: 'SubtituloID',
			image:
				'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_8.png?alt=media&token=af858eed-0c0f-4947-9bc4-2eb497f7acdf',
			check: 0,
			cInfo: 'grid-template-rows: max-content 1fr max-content'
		},
		{
			id: 'Peke',
			headerboard: 'CabeceraID',
			title: 'TituloID',
			subtitle: 'SubtituloID',
			image:
				'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_8.png?alt=media&token=af858eed-0c0f-4947-9bc4-2eb497f7acdf',
			check: 0,
			cInfo: 'grid-template-rows: max-content 1fr max-content'
		},
		{
			id: 'Hola',
			headerboard: 'CabeceraID',
			title: 'TituloID',
			subtitle: 'SubtituloID',
			image:
				'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_8.png?alt=media&token=af858eed-0c0f-4947-9bc4-2eb497f7acdf',
			check: 0,
			cInfo: 'grid-template-rows: max-content 1fr max-content'
		},
		{
			id: 'Mesatra',
			headerboard: 'CabeceraID',
			title: 'TituloID',
			subtitle: 'SubtituloID',
			image:
				'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_8.png?alt=media&token=af858eed-0c0f-4947-9bc4-2eb497f7acdf',
			check: 0,
			cInfo: 'grid-template-rows: max-content 1fr max-content'
		},
		{
			id: 'Duki',
			headerboard: 'CabeceraID',
			title: 'TituloID',
			subtitle: 'SubtituloID',
			image:
				'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_8.png?alt=media&token=af858eed-0c0f-4947-9bc4-2eb497f7acdf',
			check: 0,
			cInfo: 'grid-template-rows: max-content 1fr max-content'
		},
		{
			id: 'Nicki',
			headerboard: 'CabeceraID',
			title: 'TituloID',
			subtitle: 'SubtituloID',
			image:
				'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_8.png?alt=media&token=af858eed-0c0f-4947-9bc4-2eb497f7acdf',
			check: 0,
			cInfo: 'grid-template-rows: max-content 1fr max-content'
		}
	],
	footerItems: [
		{
			text: 'en los últimos',
			value: 50
		},
		{
			text: 'dias',
			value: 20
		}
	],
	footer: {
		text: 'en total',
		value: 25
	}
};
