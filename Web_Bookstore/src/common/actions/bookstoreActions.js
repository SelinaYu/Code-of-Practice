import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI';

import {
	SET_BOOKSTORE_INFO
} from '../constants/actionTypes';

export const setBookstoreInfo = createAction('SET_BOOKSTORE_INFO');