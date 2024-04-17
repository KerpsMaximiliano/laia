import { ILoadableEntity } from './load.interface';

// * Interfaces.
import { IAdmin } from '@admin/interfaces/admin.interface';
import { ILibraries } from '@common/interfaces/libraries.interface';
import { IUser } from '@user/interfaces/user.interface';

// * STATE.
export interface IState {
	// * ADMIN.
	admin: IAdmin;
	// * COMMON.
	common: ILibraries;
	// * USER.
	user: ILoadableEntity<IUser>;
}
