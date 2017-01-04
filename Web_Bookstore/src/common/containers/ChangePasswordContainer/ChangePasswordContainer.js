import React from 'react';
import {connect} from 'react-redux';
import ChangePassword from '../../components/ChangePassword';
import { 
  setUser,
  changePassword
} from '../../actions';
export default connect(
  (state)=> ({
    inputPassword:state.getIn(['user','inputPassword']),
    newPassword:state.getIn(['user','newPassword']),
    reNewPassword:state.getIn(['user','reNewPassword']),
    password:state.getIn(['user','password']),
    accountID:state.getIn(['user','accountID'])
  }),
  (dispatch) => ({
  	onChangeInputPassword:(event)=>(
      dispatch(setUser({key:'inputPassword',value:event.target.value}))
  	),
   	onChangeNewPassword:(event)=>(
      dispatch(setUser({key:'newPassword',value:event.target.value}))
  	),
   	onChangereNewPassword:(event)=>(
      dispatch(setUser({key:'reNewPassword',value:event.target.value}))
  	),
  	onChangePasswordSubmit:(accountID,password,inputPassword,newPassword,reNewPassword) =>() =>{
  		 dispatch(changePassword(dispatch,accountID,password,inputPassword,newPassword,reNewPassword))
  	}
  }),
  (stateProps,dispatchProps,ownProps) => {
  	const {inputPassword,newPassword,reNewPassword,password,accountID} = stateProps;
  	const {onChangePasswordSubmit} = dispatchProps;
  	return Object.assign({},stateProps,dispatchProps,ownProps,{
  		onChangePasswordSubmit:onChangePasswordSubmit(accountID,password,inputPassword,newPassword,reNewPassword)
  	})
  }
)(ChangePassword)