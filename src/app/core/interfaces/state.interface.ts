// * Interfaces.

// * STATE.
// export interface IState {}

// * STATE STATUS.
// export interface IStateStatus {}

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

// * Prop loading.
export type ILoading = 'COMPLETE' | 'ERROR' | 'LOADED' | 'LOADING';

// * LOADING.
export const loading: ILoading = 'LOADING';

// * LOADED.
export const loaded: ILoading = 'LOADED';

// * ERROR.
export const failed: ILoading = 'ERROR';

// * COMPLETE.
export const complete: ILoading = 'COMPLETE';

// * DAYS.
// eslint-disable-next-line @typescript-eslint/sort-type-constituents
export type IDays = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
