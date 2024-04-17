// * Consts.
import { LOADING } from '@consts/load.const';

// * Interfaces.
import { ICollection } from '@common/interfaces/collection.interface';

// * Sorts.
import { TCollections } from '@common/sorts/common.sort';

export const AUX_COLLECTION: ICollection = {
	information: {
		status: LOADING,
		id: 0,
		title: '',
		open: false
	},
	view: {
		status: LOADING,
		elements: [],
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
		filter: {
			id: 0,
			alias: ''
		},
		order: {
			alias: '',
			type: 0
		},
		default: 0
	},
	miniatures: {
		status: LOADING,
		props: [],
		header: [],
		title: [],
		subtitle: [],
		style: ''
	},
	order: {
		status: LOADING,
		type: 0,
		props: []
	},
	filter: {
		status: LOADING,
		items: []
	}
};

export const COLLECTION_ALIAS: { [key in keyof TCollections]: string } = {
	id: '',
	media: '',
	name: 'Sin nombre',
	surname: 'Sin apellido',
	email: 'Sin correo electrónico',
	phone: 'Sin teléfono',
	date: '',
	count: '',
	// eslint-disable-next-line @typescript-eslint/naming-convention
	count_article: '',
	// eslint-disable-next-line @typescript-eslint/naming-convention
	count_article_total: '',
	total: '',
	// eslint-disable-next-line @typescript-eslint/naming-convention
	total_max: ''
};

export const COLLECTION_ORDER_ALIAS: { [key: string]: string } = {
	name: 'Por nombre',
	surname: 'Por apellido',
	email: 'Por correo electrónico',
	phone: 'Por teléfono',
	date: 'Por fecha'
};
