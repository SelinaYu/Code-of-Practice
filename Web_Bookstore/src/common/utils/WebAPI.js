import axios from 'axios';
import { browserHistory } from 'react-router';
import uuid from 'uuid';

import {
	authComplete,
	authError,
	completeLogout,
	setUser
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
				alert(response.data.message);
				window.location.reload();
			}else{ 
               dispatch(setUser({key:'accountID',value:response.data.userId}));
               dispatch(setUser({key:'accountRight',value:response.data.accountRight}));                
			    dispatch(authComplete());
			    browserHistory.push('/');	
			}
		})
		.catch(function(error){
			dispatch(authError)
		});
	},
	logout:(dispatch) => {
		browserHistory.push('/')
	},
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
				browserHistory.push('/login')
			}
		}).
		catch(function(error){});
	},
	takeToCar:(dispatch,bookID,isAuthorized,accountID) => {
		console.log(isAuthorized)
	  if(isAuthorized == false){
	  	browserHistory.push('/login')
	  }else{
        //获取用户的购物车ID
        //判断是否存在购物车中
        //不存在则插入商品
        //插入详细购物车清单
        //商品数量加1  	
	  }

	}
}