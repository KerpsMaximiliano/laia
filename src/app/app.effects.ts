import { CommonEffects } from '@common/state/common.effects';
import { SellEffects } from '@sell/state/sell.effects';
import { UserEffects } from '@user/state/user.effects';

export const ROOT_EFFECTS = [UserEffects, SellEffects, CommonEffects];
