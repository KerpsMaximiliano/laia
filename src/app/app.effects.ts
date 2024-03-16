import { UserEffects } from '@user/state/user.effects';
import { SellEffects } from './modules/admin/pages/sell/state/sell.effects';

export const ROOT_EFFECTS = [UserEffects, SellEffects];
