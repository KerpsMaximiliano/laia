import { ILoading } from '@app/core/sorts/loading.sort';

// * Entities loading.
export interface ILoadableEntities<T> {
	status: ILoading;
	items: T[];
}

// * Entity loading.
export interface ILoadableEntity<T> {
	status: ILoading;
	data: T;
}
