import axios from 'axios';
import { browserHistory } from 'react-router';
import uuid from 'uuid';

import {
	authComplete,
	authError,
	completeLogout,
	setUser
} from '../actions';
function getCookie(keyName) {
  var name = keyName + '=';
  const cookies = document.cookie.split(';');
  for(let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0)==' ') {
          cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
  }
  return "";
}
function setCookie(key,value){
  let  cookietext = key+"="+encodeURIComponent(value);
  document.cookie = cookietext;
  return cookietext;
}
export default {
	login: (dispatch,username,password) => {
		axios.post('/api/login',{
			username:username,
			password:password
		})
		.then((response) => {
			if(response.data.success == false){
				alert(response.data.message);
				dispatch(authError()); 
				window.location.reload();
			}else{ 
				const accountID = response.data.userId;
				const accountRight = response.data.accountRight;
				const tel = response.data.tel;
				const sex = response.data.sex;

				if(!document.cookie.token){
					let date = new Date();
					date.setTime(date.getTime()+(3*60*1000)); //三分钟
					const expires = 'expires='+date.toUTCString();
					document.cookie = 'token='+response.data.token+';'+expires;
					setCookie('accountID',accountID);
					setCookie('accountRight',accountRight);
					setCookie('username',username);
					setCookie('password',password);
					setCookie('tel',tel);
					setCookie('sex',sex);
				}
               dispatch(setUser({key:'accountID',value:accountID}));
               dispatch(setUser({key:'accountRight',value:accountRight}));
               dispatch(setUser({key:'tel',value:tel})); 
                dispatch(setUser({key:'sex',value:sex}));          
			    dispatch(authComplete());
			    browserHistory.push('/');	
			}
		})
		.catch(function(error){
			dispatch(authError)
		});
	},
	logout:(dispatch) => {
		document.cookie = 'token=; ' + 'expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		browserHistory.push('/')
	},
	checkAuth:(dispatch,token) => {
		axios.post('api/authenticate',{
			token:token
		})
		.then((response)=>{
			if(response.data.success === false){
				dispatch(authError())
			}else{
				dispatch(authComplete())
			}
		})
		.catch(function(error){
			dispatch(authError())
		})
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
          axios.put('/api/changePassword?token=' + getCookie('token'),{
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
	changePersonalInfo:(dispatch,accountID,username,sex,tel)=>{
          axios.post('/api/changePersonalInfo?token=' + getCookie('token'),{
             username:username,
             sex:sex,
             tel:tel,
             accountID:accountID
          }).then((response) => {
          	if(response.data.success == false){
          		alert("数据库修改失败")
          	}else{
               alert("修改成功");  
          	}
          })		
	},
	// getUserInfo:(dispatch,accountID) => {
	// 	console.log("accountID",accountID)
	// 	axios.post('/api/getUserInfo?token=' + getCookie('token'),{
	// 		accountID: accountID
	// 	}).then((response)=>{
 //      	if(response.data.success == false){
 //      		alert("获取用户数据失败")
 //      	}else{
 //      	   const data = response.data;
 //           dispatch(setUser({key:'tel',value:data.tel}));  
 //           dispatch(setUser({key:'sex',value:data.sex}));   	   
 //      	}			
	// 	})
	// },
	takeToCar:(dispatch,bookID,isAuthorized,accountID) => {
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