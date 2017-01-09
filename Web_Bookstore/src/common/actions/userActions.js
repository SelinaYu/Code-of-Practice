import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI';

import {
	AUTH_START,
	AUTH_COMPLETE,
	AUTH_ERROR,
	START_LOGOUT,
	CHECK_AUTH,
	SET_USER,
	ADD_USER,
	CHANGE_PASSWORD,
	CHANGE_PERSONALINFO
} from '../constants/actionTypes';

export const authStart = createAction('AUTH_START', WebAPI.login);
export const authComplete = createAction('AUTH_COMPLETE');
export const authError = createAction('AUTH_ERROR');
export const startLogout = createAction('START_LOGOUT', WebAPI.logout);
export const checkAuth = createAction('CHECK_AUTH');
export const setUser = createAction('SET_USER');

export const addUser = createAction('ADD_USER',WebAPI.addUser);
export const changePassword = createAction('CHANGE_PASSWORD',WebAPI.changePassword)
export const changePersonalInfo = createAction('CHANGE_PERSONALINFO',WebAPI.changePersonalInfo);
