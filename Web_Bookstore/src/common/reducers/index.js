import { combineReducers } from 'redux-immutable';
import ui from './ui/uiReducers';
import user from './data/userReducers';
import book from './data/bookReducers';
import bookstore from './data/bookstoreReducers';

 const rootReducer = combineReducers({
 	ui,
 	user,
 	book,
 	bookstore
 });
 export default rootReducer;
 