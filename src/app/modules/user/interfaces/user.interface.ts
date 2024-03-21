// * Sorts.
import { ILoading } from '@app/core/sorts/loading.sort';

export interface IUser {
	id: number;
	logged: boolean;
	email: string | null;
	password: string | null;
	image: string | null;
	name: string | null;
	surname: string | null;
	phone: string | null;
	check: number | null;
}

// ! AUX.
export interface ILogin {
	status: ILoading;
	logged: boolean;
	check: number;
}
