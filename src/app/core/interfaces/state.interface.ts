import { ILoadableEntity } from './load.interface';

// * Interfaces.
import { IAdmin } from '@admin/interfaces/admin.interface';
import { ILibrary } from '@libraries/interfaces/libraries.interface';
import { IUser } from '@user/interfaces/user.interface';

// * STATE.
export interface IState {
	// * ADMIN.
	admin: IAdmin;
	// * USER.
	user: ILoadableEntity<IUser>;
	// * LIBRARIES.
	libraries: ILibrary[];
}
