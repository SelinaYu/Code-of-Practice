import React from 'react';
import {connect} from 'react-redux';
import RegisterPage from '../../components/RegisterPage';
import {
  setUser,
  addUser
} from'../../actions';

export default connect(
	(state) => ({
		username:state.getIn(['user','username']),
		password:state.getIn(['user','password']),
		sex:state.getIn(['user','sex']),
		tel:state.getIn(['user','tel'])
	}),
	(dispatch) => ({
		onChangeUsernameInput:(event) => (
        dispatch(setUser({key:'username',value:event.target.value}))  
			) ,
		onChangePasswordInput:(event) => (
			  dispatch(setUser({key:'password',value:event.target.value}))  
			),
		onChangeTelInput:(event) =>(
         dispatch(setUser({key:'tel',value:event.target.value}))
			),
		onChangeSexInput:(event) => {
         dispatch(setUser({key:'sex',value:event.target.value}))
		},
		onRegisterSumbit:(username,password,sex,tel) => () =>{
         dispatch(addUser(dispatch,username,password,sex,tel))
		}
	}),
		(stateProps, dispatchProps, ownProps) => {
			const { username,password,sex,tel} = stateProps;
			const { onRegisterSumbit } = dispatchProps;
			return Object.assign({},stateProps,dispatchProps,ownProps,{
				onRegisterSumbit:onRegisterSumbit(username,password,sex,tel) 
			})
		}
)(RegisterPage);