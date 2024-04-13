export interface ILanding {
	id: number;
	item: IItems[];
	config: IConfig;
	baudio: IMedia | null;
}

interface IItems {
	btype: 'IMAGE' | 'VIDEO';
	title: string | null;
	subtitle: string | null;

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
	header: IHeader;
	background: string; // "FILTRO" background-color: rgba(0, 0, 0, 0.2)
	color: string; // HEX => Color del title - subtitle
	position: 'BOT' | 'MID' | 'TOP'; // Posicion del titulo y subtitulo
	button: IButton; // Se define el color de la letra y el color del boton.
}

interface IButton {
	color: string;
	bcolor: string;
	label: string;
}

export const data: ILanding = {
	id: 1,
	baudio: {
		src: '../../../../../../../assets/audio/audio.mp3',
		volumen: 1,
		loop: false
	},
	item: [
		{
			btype: 'VIDEO',
			title: 'Para la Industria de Flores',
			subtitle: 'Gestiona y lleva el control de las propuestas de negocios y órdenes de compras que le emites a tus proveedores.',

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
			bvideo: null
		}
	],
	config: {
		header: {
			type: 'LOGO-TITLE',
			merchantName: 'Emiliano',
			merchantLogo:
				'https://firebasestorage.googleapis.com/v0/b/laia-c5d59.appspot.com/o/images%2Fprod_4.png?alt=media&token=a2c4cc03-e85d-4be5-afff-c111a3e0a8fc'
		},
		background: '#000',
		color: '#fff',
		position: 'BOT',
		button: {
			color: '#fff',
			bcolor: '#000',
			label: 'Mira todo lo que ofrecemos'
		}
	}
};
