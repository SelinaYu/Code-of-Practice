import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI';

import {
	TAKE_TO_CAR
} from '../constants/actionTypes';

export const takeToCar = createAction('TAKE_TO_CAR');