import axios from 'axios';
import { browserHistory } from 'react-router';
import uuid from 'uuid';

import {
	authComplete,
	authError,
	hideSpinner,
	completeLogout
} from '../actions';

export default {
	// login: (dispatch,username,password) => {
	// 	axios.post('/api/login',{
	// 		username:username,
	// 		password:password
	// 	})
	// 	.then((response) => {
	// 		if(response.data.success == false){
	// 			dispatch(authError);
	// 			dispatch(hideSpinner);
	// 			alert(response.data.message);
	// 			window.location.reload();
	// 		}else{
	// 		    dispatch(authComplete());
	// 		    dispatch(hideSpinner());
	// 		    browserHistory.push('/');	
	// 		}
	// 	})
	// 	.catch(function(error){
	// 		dispatch(authError)
	// 	});
	// },
	getBooks:()=>{
		axios.get('/api/books')
		.then((response)=>{

		}).catch((error)=>{});
	},
	addUser:(dispatch,username,password,sex,tel) => {
		axios.post('/api/register',{
			accountName:username,
			accountPsd:password,
			accountSex:sex,
			accountTele:tel
		}).then((response) => {
			if(response.data.success == false){
				alert('发生错误，请再试一次');
				browserHistory.push('/register')
			}else{
				// window.location.reload();
				alert('成功')
				browserHistory.push('/register')
			}
		}).
		catch(function(error){});
	}
}