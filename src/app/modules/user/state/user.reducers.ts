import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

// * STATE - Const.
import { USER_STATE } from './user.state';

// * Conts.
import { COMPLETE, FAILED, LOADED, LOADING } from '@consts/load.const';

// * Interfaces.
import { ILoadableEntity } from '@interfaces/load.interface';
import { IUser } from '@user/interfaces/user.interface';

// * Actions.
import {
	SQQ_CHECK,
	SQQ_CHECKED,
	SQQ_LOGIN,
	SQQ_LOGIN_ERROR,
	SQQ_LOGIN_SUCCESS,
	SQQ_RESET,
	USER_INFO_UPDATE,
	USER_INFO_UPDATED
} from './user.actions';

export const USER_REDUCERS: ActionReducer<ILoadableEntity<IUser>, Action> = createReducer(
	// * INITIAL STATE.
	USER_STATE,
	on(SQQ_CHECK, (state): ILoadableEntity<IUser> => {
		return { status: LOADING, data: state.data };
	}),
	on(SQQ_CHECKED, (state, { id, email, name, surname, check, logged }): ILoadableEntity<IUser> => {
		return { status: LOADED, data: { ...state.data, id, email, name, surname, check, logged } };
	}),
	on(SQQ_LOGIN, (state): ILoadableEntity<IUser> => {
		return { ...state, status: LOADING };
	}),
	on(SQQ_LOGIN_SUCCESS, (state, { phone, image }): ILoadableEntity<IUser> => {
		return { status: LOADED, data: { ...state.data, phone, image, logged: true } };
	}),
	on(SQQ_LOGIN_ERROR, (state): ILoadableEntity<IUser> => {
		return { ...state, status: FAILED };
	}),
	on(SQQ_RESET, (state): ILoadableEntity<IUser> => {
		return { status: LOADED, data: { ...state.data, id: 0, email: null, name: null, surname: null, check: null } };
	}),
	on(USER_INFO_UPDATE, (state): ILoadableEntity<IUser> => {
		return { ...state, status: LOADING };
	}),
	on(USER_INFO_UPDATED, (state, { name, surname, phone }): ILoadableEntity<IUser> => {
		const user: ILoadableEntity<IUser> = { status: COMPLETE, data: { ...state.data } };
		if (name) user.data.name = name;
		if (surname) user.data.surname = surname;
		if (phone) user.data.phone = phone;
		return user;
	})
);
