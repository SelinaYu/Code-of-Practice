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
	login: (dispatch,username,password) => {
		axios.post('/api/login',{
			username:username,
			password:password
		})
		.then((response) => {
			if(response.data.success == false){
				dispatch(authError);
				dispatch(hideSpinner);
				alert(response.data.message);
				window.location.reload();
			}else{
			    dispatch(authComplete());
			    dispatch(hideSpinner());
			    browserHistory.push('/');	
			}
		})
		.catch(function(error){
			dispatch(authError)
		});
	}
}