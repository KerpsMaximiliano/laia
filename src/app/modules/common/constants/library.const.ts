// * Consts.
import { LOADING } from '@consts/load.const';

// * Interfaces.
import { ILibrary } from '@common/interfaces/libraries.interface';
import { IButton } from '@common/interfaces/util.interface';
import { TLibraries, TMiniature } from '@common/sorts/common.sort';

export const AUX_LIBRARY: ILibrary = {
	information: {
		status: LOADING,
		id: 0,
		title: '',
		selected: null
	},
	view: {
		status: LOADING,
		collections: [],
		button: {
			label: '',
			action: '',
			icon: null,
			visibility: false
		},
		count: 0,
		footer: ''
	},
	menu: {
		status: LOADING,
		button: {
			label: '',
			action: '',
			icon: null,
			visibility: false
		},
		default: 0
	},
	miniatures: {
		status: LOADING,
		props: [],
		header: [],
		title: [],
		subtitle: []
	}
};

interface Informacion {
	library: {
		view: IButton;
		menu: IButton;
		footer: string;
	};
	collection: {
		view: IButton;
		menu: IButton;
		footer: string;
	};
}

export const LIBRARIES_INFORMATION: { [key in TLibraries]: Informacion } = {
	buyers: {
		library: {
			view: {
				label: '',
				action: '',
				icon: null,
				visibility: false
			},
			menu: {
				label: '',
				action: '',
				icon: null,
				visibility: false
			},
			footer: ' Compradores'
		},
		collection: {
			view: {
				label: '',
				action: '',
				icon: null,
				visibility: false
			},
			menu: {
				label: '',
				action: '',
				icon: null,
				visibility: false
			},
			footer: ' Compradores'
		}
	}
};

export const MINIATURES_ALIAS: { [key in TMiniature]: string | null } = {
	id: null,
	media: null,
	email: 'Correo electrónico',
	name: 'Nombre',
	surname: 'Apellido',
	phone: 'Teléfono',
	date: 'Fecha de la ultima compra realizada',
	count: 'Cantidad de compras realizadas',
	// eslint-disable-next-line @typescript-eslint/naming-convention
	count_article: 'Cantidad de artículos en una compra',
	// eslint-disable-next-line @typescript-eslint/naming-convention
	count_article_total: 'Cantidad total de artículos comprados',
	total: 'Precio de una compra',
	// eslint-disable-next-line @typescript-eslint/naming-convention
	total_max: 'Precio total de las compras'
};
