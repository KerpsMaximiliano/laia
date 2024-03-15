import { IResponse } from '@interfaces/response.interface';

interface IUser {
	id: number;
	name: string | null;
	email: string | null;
	password: string | null;
	phone: string | null;
	image: string | null;
	first: number;
	operationStatus: number;
}

interface IUserLogin {
	name: string | null;
	phone: string | null;
	image: string | null;
	first: number;
	operationStatus: number;
}

export type IUserCheckResponse = IResponse<{ lUser: IUser }>;
export type IUserLoginResponse = IResponse<{ lUser: IUserLogin }>;
