// * Consts.
import { LOADING } from '@consts/load.const';

// * Interfaces.
import { ILibraries } from '@libraries/interfaces/libraries.interface';

// * LIBRARIES.
export const LIBRARIES_STATE: ILibraries = {
	buyers: {
		status: LOADING,
		id: 0,
		title: '',
		modified: 0,
		disminutive: '',
		multimedias: 0,
		collections: [],
		selected: null
	}
};
