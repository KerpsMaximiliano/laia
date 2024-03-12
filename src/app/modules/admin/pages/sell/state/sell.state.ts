// * Consts.
import { INITIAL } from '@app/core/constants/load.const';

// * Interfaces.
import { ISell } from '@sell/interfaces/sell.interface';

// * ADMIN SELL INITIAL STATE.
export const ADMIN_SELL_STATE: ISell = {
	articles: {
		status: INITIAL,
		items: []
	}
};
