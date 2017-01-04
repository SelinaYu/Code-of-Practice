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
				alert(response.data.message);
				dispatch(authError);
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
	changePassword:(dispatch,accountID,password,inputPassword,newPassword,reNewPassword)=> {
		console.log(accountID,password,inputPassword,newPassword,reNewPassword)
		if(password != inputPassword){
          alert("密码输入错误，修改失败");
          return;
		}else if(newPassword == ''){
			alert("密码输入不能为空");
			return;
		}
		else if(newPassword != reNewPassword){
			alert("两次密码输入不同错误，修改失败");
			return;
		}else{
          axios.post('/api/changePassword',{
             accountID:accountID,
             newPassword:newPassword
          }).then((response) => {
          	if(response.data.success == false){
          		alert("数据库修改失败")
          	}else{
               dispatch(setUser({key:'password',value:newPassword})); 
               dispatch(setUser({key:'inputPassword',value:''}));
               dispatch(setUser({key:'newPassword',value:''}));
               dispatch(setUser({key:'reNewPassword',value:''})); 
               alert("修改成功");  

          	}
          })
		}

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