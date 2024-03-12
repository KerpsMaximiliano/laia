// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';
import { IState } from '@interfaces/state.interface';
import { ILogin, IUser } from '@user/interfaces/user.interface';

// * USER.
export const selectUser = (state: IState): ILoadableEntity<IUser> => state.user;

// * USER LOGGED.
export const selectLogin = (state: IState): ILogin => {
	return {
		status: state.user.status,
		logged: state.user.data.logged,
		check: state.user.data.id
	};
};
