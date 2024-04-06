// * Consts.
import { LOADING } from '@consts/load.const';

// * Interfaces.
import { ILibrary, ILibraryConf } from '@common/interfaces/libraries.interface';
import { IButton } from '../interfaces/util.interface';

export const AUX_LIBRARY: ILibrary = {
	status: LOADING,
	id: 0,
	title: '',
	collections: [],
	conf: null,
	selected: null,
	count: 0,
	button: {
		label: '',
		action: ''
	},
	footer: ''
};

export const AUX_LIBRARY_CONFIGURATION: ILibraryConf = {
	status: LOADING,
	title: '',
	conf: null
};

export const LIBRARY_BTNS: IButton[][] = [
	[
		{
			label: 'Nuevo Comprador',
			action: 'BUYER'
		},
		{
			label: 'Nuevo Comprador',
			action: 'NEW-BUYER'
		}
	]
];

export const LIBRARY_FOOTER: string[] = [' Compradores'];
