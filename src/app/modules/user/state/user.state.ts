// * Consts.
import { INITIAL } from '@consts/load.const';

// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';
import { IUser } from '@user/interfaces/user.interface';

// * USER INITIAL STATE.
export const USER_STATE: ILoadableEntity<IUser> = {
	status: INITIAL,
	data: {
		id: 0,
		email: null,
		image: null,
		logged: false,
		name: null,
		surname: null,
		password: null,
		phone: null,
		check: null
	}
};
