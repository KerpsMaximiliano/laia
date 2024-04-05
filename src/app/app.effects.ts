import { Librariesffects } from '@libraries/state/libraries.effects';
import { SellEffects } from '@sell/state/sell.effects';
import { UserEffects } from '@user/state/user.effects';

export const ROOT_EFFECTS = [UserEffects, SellEffects, Librariesffects];
