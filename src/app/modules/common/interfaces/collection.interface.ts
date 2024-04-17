// * Interfaces.
import { IButton } from './util.interface';

// * Sorts.
// * COMMON.
import { TCollections, TMiniature } from '@common/sorts/common.sort';
// * CORE.
import { ILoading } from '@sorts/loading.sort';

// * COLLECTION INTERFACE.
export interface ICollection {
	// * COMMON.
	information: {
		status: ILoading;
		id: number;
		title: string;
		open: boolean;
	};
	view: {
		status: ILoading;
		elements: TCollections[];
		button: IButton;
		count: number;
		footer: string;
	};
	menu: {
		status: ILoading;
		button: IButton;
		order: {
			alias: string;
			type: number;
		};
		filter: {
			id: number;
			alias: string;
		};
		default: number;
	};
	miniatures: {
		status: ILoading;
		props: TMiniature[];
		header: TMiniature[];
		title: TMiniature[];
		subtitle: TMiniature[];
		style: string;
	};
	order: {
		status: ILoading;
		type: number;
		props: TMiniature[];
	};
	filter: {
		status: ILoading;
		items: { key: string; value: number | string | null }[];
	};
}
