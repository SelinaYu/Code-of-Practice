import { handleActions } from 'redux-actions';
import { BookStoreState }  from '../../constants/models';

import {
  SET_BOOKSTORE_INFO
} from '../../constants/actionTypes';
const bookstoreReducers = handleActions({
	SET_BOOKSTORE_INFO:	(state,{payload}) => (
		state.set(payload.key,payload.value)
	)
},BookStoreState);
export default bookstoreReducers;