import { handleActions } from 'redux-actions';
import { BookState }  from '../../constants/models';

import {
  GET_BOOKS
} from '../../constants/actionTypes';

const bookReducers = handleActions({
	GET_BOOKS:(state,{payload}) => (
      state.set('books',payload.books)
	)
},BookState);
export default bookReducers;