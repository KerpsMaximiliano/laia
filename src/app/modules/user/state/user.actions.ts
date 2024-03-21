import { createAction, props } from '@ngrx/store';

// * SQQ CHECK.
export const SQQ_CHECK = createAction('[Ecommerce] Sqq Check', props<{ email: string; google: boolean }>());
export const SQQ_CHECKED = createAction(
	'[Ecommerce] Sqq Checked',
	props<{ id: number; email: string; name: string | null; surname: string | null; check: number; logged: boolean }>()
);

// * SQQ LOGIN.
export const SQQ_LOGIN = createAction('[Ecommerce] Sqq Login', props<{ user: number; password: string }>());
export const SQQ_LOGIN_SUCCESS = createAction('[Ecommerce] Sqq Login Success', props<{ phone: string | null; image: string | null }>());
export const SQQ_LOGIN_ERROR = createAction('[Ecommerce] Sqq Login Error');
export const SQQ_RESET = createAction('[Ecommerce] Sqq Reset');

// * USER UPDATE.
export const USER_INFO_UPDATE = createAction(
	'[Ecommerce] Sqq Update',
	props<{ id: number; name: string; surname: string; phone: string; password: string }>()
);
export const USER_INFO_UPDATED = createAction('[Ecommerce] Sqq Updated', props<{ name?: string; surname?: string; phone?: string }>());
