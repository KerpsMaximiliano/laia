// * Interfaces.
import { IAdmin } from '@admin/interfaces/admin.interface';

// * STATE - Const.
import { ADMIN_SELL_STATE } from '@sell/state/sell.state';

export const ADMIN_STATE: IAdmin = {
	sell: ADMIN_SELL_STATE
};
