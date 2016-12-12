import { combineReducers } from 'redux-immutable';
import ui from './ui/uiReducers';
import user from './data/userReducers';
// import book from './data/bookReducers';

 const rootReducer = combineReducers({
 	ui,
 	user,
 	// book
 });
 export default rootReducer;
 