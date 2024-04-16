export interface ILanding {
	id: number;
	item: IItems[]; // Elementos del slide.
	config: IConfig; // Configuracion (Color de fondo, color de las letras, definicion del boton)
	baudio: IMedia | null;
	desc: IDesc[];
}

interface IItems {
	btype: 'IMAGE' | 'VIDEO';
	title: string | null;
	subtitle: string | null;
	position: 'center' | 'end' | 'start'; // Posicion del titulo y subtitulo
	bimage: string | null;
	bvideo: IMedia | null;
}

interface IHeader {
	type: 'LOGO-TITLE' | 'LOGO' | 'NONE' | 'TITLE';
	merchantName: string | null;
	merchantLogo: string | null;
}

interface IMedia {
	src: string;
	volumen: number;
	loop: boolean;
}

interface IConfig {
	type: 'AUDIO-VIDEO' | 'AUDIO' | 'NONE' | 'VIDEO';
	header: IHeader;
	color: string; // HEX => Color del title - subtitle
	button: IButton; // Se define el color de la letra y el color del boton.
}

interface IButton {
	color: string;
	bcolor: string;
	label: string;
}

interface IDesc {
	title: string;
	desc: string | null;
	src: string | null;
}

export const data: ILanding = {
	id: 1,
	baudio: {
		src: '../../../../../../../assets/audio/audio.mp3',
		volumen: 0.15,
		loop: false
	},
	item: [
		{
			btype: 'VIDEO',
			title: 'Para la Industria de Flores',
			subtitle: 'Gestiona y lleva el control de las propuestas de negocios y órdenes de compras que le emites a tus proveedores.',
			position: 'start',
			bimage: '',
			bvideo: {
				src: '../../../../../../../assets/video/video.mp4',
				volumen: 0.1, // * Volumen de 1 a 0, => 0.1(10), 0.2(20) * //
				loop: true
			}
		},
		{
			btype: 'IMAGE',
			title: 'Para la Industria de don PEDRO',
			subtitle: 'Gestiona y lleva el control de las propuestas de PEDRo y órdenes de compras que le emites a tus proveedores CUACK.',

			bimage:
				'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_3.png?alt=media&token=c06be23a-a579-4e9b-a693-7477d7a832b4',
			bvideo: null,
			position: 'end'
		},
		{
			btype: 'IMAGE',
			title: 'Para la Industria de don PEDRO',
			subtitle: 'Gestiona y lleva el control de las propuestas de PEDRo y órdenes de compras que le emites a tus proveedores CUACK.',

			bimage:
				'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_3.png?alt=media&token=c06be23a-a579-4e9b-a693-7477d7a832b4',
			bvideo: null,
			position: 'end'
		}
	],
	config: {
		type: 'AUDIO-VIDEO',
		header: {
			type: 'TITLE',
			merchantName: 'Emiliano',
			merchantLogo:
				'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_4.png?alt=media&token=a2c4cc03-e85d-4be5-afff-c111a3e0a8fc'
		},
		color: '#fff',
		button: {
			color: '#fff',
			bcolor: '#000',
			label: 'Mira todo lo que ofrecemos'
		}
	},
	desc: [
		{
			title: 'DDDDDDDDDD',
			desc: 'DSSSSSSSsfsafa Afganista sen ',
			src: 'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_3.png?alt=media&token=c06be23a-a579-4e9b-a693-7477d7a832b4'
		},
		{
			title: 'Titutlo del segmento',
			desc: 'Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn Descripcionn ',
			src: null
		}
	]
};
