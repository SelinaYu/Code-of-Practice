import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI';

import {
	TAKE_TO_CAR,
	GET_BOOKS
} from '../constants/actionTypes';

export const takeToCar = createAction('TAKE_TO_CAR',WebAPI.takeToCar);
export const getBooks = createAction('GET_BOOKS',WebAPI.getBooks)