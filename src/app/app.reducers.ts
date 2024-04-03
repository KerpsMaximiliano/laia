import { ActionReducerMap, combineReducers } from '@ngrx/store';

// * REDUCERS.
import { LIBRERIES_REDUCERS } from '@libraries/state/libraries.reducers';
import { ADMIN_SELL_REDUCERS } from '@sell/state/sell.reducers';
import { USER_REDUCERS } from '@user/state/user.reducers';

// * Interfaces.
import { IState } from '@interfaces/state.interface';

export const ROOT_REDUCERS: ActionReducerMap<IState> = {
	admin: combineReducers({
		sell: ADMIN_SELL_REDUCERS
	}),
	user: USER_REDUCERS,
	libraries: LIBRERIES_REDUCERS
};
