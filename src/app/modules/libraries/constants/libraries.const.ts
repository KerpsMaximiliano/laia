// * Consts.
import { LOADING } from '@consts/load.const';

// * Interfaces.
import { ILibrary, ILibraryButton, ILibraryConf } from '@libraries/interfaces/libraries.interface';

const BTN: ILibraryButton = {
	label: '',
	action: '',
	visibility: false
};

export const LIBRARY: ILibrary = {
	status: LOADING,
	id: 0,
	title: '',
	multimedia: 0,
	collections: [],
	default: null,
	selected: null,
	count: 0,
	button: [BTN],
	type: 0
};

export const LIBRARY_CONF: ILibraryConf = {
	status: LOADING,
	title: '',
	default: null,
	button: BTN
};

export const LIBRARY_BTNS: ILibraryButton[][] = [
	[
		{
			label: 'Nuevo Comprador',
			action: 'BUYER',
			visibility: true
		},
		{
			label: 'Nuevo Comprador',
			action: 'NEW-BUYER',
			visibility: true
		}
	]
];
