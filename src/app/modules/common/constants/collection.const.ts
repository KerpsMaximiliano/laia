import { LOADING } from '../../../core/constants/load.const';
import { ILoadableEntity } from '../../../core/interfaces/load.interface';
import { ICollection } from '../interfaces/collection.interface';
import { IButton } from '../interfaces/util.interface';
import { TCollection } from '../sorts/common.sort';

export const COLLECTION: ILoadableEntity<ICollection> = {
	status: LOADING,
	data: {
		id: 0,
		title: '',
		miniature: {
			headerboard: [],
			title: [],
			subtitle: [],
			style: ''
		},
		conf: null,
		elements: [],
		button: {
			label: '',
			action: ''
		},
		count: 0,
		footer: ''
	}
};

export const COLLECTION_BTNS: IButton[][] = [
	[
		{
			label: 'Seleccionar Comprador',
			action: 'ADD-BUYER'
		},
		{
			label: 'Nuevo Comprador',
			action: 'NEW-BUYER'
		}
	]
];

export const COLLECTION_FOOTER: string[] = [' Compradores'];

export const COLLECTION_ALIAS: { [key in keyof TCollection]: string } = {
	id: '',
	media: '',
	name: 'Sin nombre',
	surname: 'Sin apellido',
	email: 'Sin correo electrónico',
	phone: 'Sin teléfono'
};
