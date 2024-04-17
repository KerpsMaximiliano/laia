// * Interfaces.
import { ICollection } from './collection.interface';
import { IButton } from './util.interface';

// * Sorts.
// * COMMON.
import { TMiniature } from '@common/sorts/common.sort';
// * CORE.
import { ILoading } from '@sorts/loading.sort';

// * LIBRARIES.
export interface ILibraries {
	buyers: ILibrary;
}

// * LIBRARY.
export interface ILibrary {
	information: {
		status: ILoading;
		id: number;
		title: string;
		selected: number | null;
	};
	view: {
		status: ILoading;
		collections: ICollection[];
		button: IButton;
		count: number;
		footer: string;
	};
	menu: {
		status: ILoading;
		button: IButton;
		default: number;
	};
	miniatures: {
		status: ILoading;
		props: TMiniature[];
		header: TMiniature[];
		title: TMiniature[];
		subtitle: TMiniature[];
	};
}
