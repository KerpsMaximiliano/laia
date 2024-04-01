import { IAction } from '@app/core/sorts/library.sort';

// * Entities sections.
export interface ISections<T> {
	status: IAction;
	items: T[];
}

// * Entity section.
export interface ISection<T> {
	action: IAction;
	item: T;
}
