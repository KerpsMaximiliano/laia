// * Interfaces.
// * COMMON.
import { ICollection } from './collection.interface';
import { IButton } from './util.interface';
// * CORE.
import { ILoadableEntity } from '@interfaces/load.interface';

// * Sorts.
import { ILoading } from '@sorts/loading.sort';

// * LIBRARY.
export interface ILibrary {
	status: ILoading;
	id: number;
	title: string;
	collections: ILoadableEntity<ICollection>[];
	conf: {
		default: number;
		button: IButton;
	} | null;
	selected: number | null;
	count: number;
	button: IButton;
	footer: string;
}

// ! AUX.
// * LIBRARY CONFIGURATION.
export interface ILibraryConf {
	status: ILoading;
	title: string;
	conf: {
		default: number;
		button: IButton;
	} | null;
}
