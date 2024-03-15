import { createAction, props } from '@ngrx/store';

// * USER RESET.
export const USER_RESTORE = createAction('[Ecommerce] Restore User');

// * USER CHECK.
export const USER_CHECK = createAction('[Ecommerce] User Check', props<{ email: string }>());
export const USER_CHECKED = createAction('[Ecommerce] User Checked', props<{ check: number; logged: boolean }>());

// * USER LOGIN.
export const USER_LOGIN = createAction(
	'[Ecommerce] User Login',
	props<{ user: number; email: string; password: string }>()
);
export const USER_LOGIN_SUCCESS = createAction('[Ecommerce] User Success', props<{ email: string }>());
export const USER_LOGIN_ERROR = createAction('[Ecommerce] User Error', props<{ err: number }>());

// * USER INFO.
export const USER_INFO = createAction(
	'[Ecommerce] User Info',
	props<{ name?: string; surname?: string; phone?: string; password?: string }>()
);
export const USER_INFO_SUCCESS = createAction(
	'[Ecommerce] User Info Success',
	props<{ name?: string; surname?: string; phone?: string }>()
);

// * USER LOGOUT.
export const USER_LOGOUT = createAction('[Ecommerce] User Logout');
export const USER_LOGOUT_SUCCESS = createAction('[Ecommerce] User Logout Success');

/**
 * 1. Usuario ingresa a auth/login.
 * 2. Usuario ingresa su correo electrónico.
 * 3. Comprobamos correo electrónico.
 * 4.1. Si el correo electrónico no existe, inicia sesión.
 * 4.2. Si el correo electrónico existe, solicitamos credenciales.
 * 5.1. Usuario ingresa su contraseña (correcta), redirigimos a la ruta desde donde provino.
 * 5.2. Usuario ingresa su contraseña (incorrecta), alertamos y solicitamos nuevamente la contraseña.
 */
