import { IResponse } from '@interfaces/response.interface';

interface ISQQCheck {
	status: number;
	userId: number;
	userName: string | null;
	userLastName: string | null;
}

interface ISQQLogin {
	phone: string | null;
	image: string | null;
	status: number;
}

export type ISQQCheckResponse = IResponse<{ sqqCheck: ISQQCheck }>;
export type ISQQLoginResponse = IResponse<{ sqqLogin: ISQQLogin }>;
