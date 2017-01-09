import React from 'react';
import {connect} from'react-redux';
import ChangePersonalInfo from '../../components/ChangePersonalInfo';
import { 
  setUser,
  changePersonalInfo
} from '../../actions';

export default connect(
	(state)=>({
	  accountID:state.getIn(['user','accountID']),
      username:state.getIn(['user','username']),
      sex:state.getIn(['user','sex']),
      tel:state.getIn(['user','tel'])
	}),
	(dispatch)=>({
		onChangeUsernameInput:(event) => (
        dispatch(setUser({key:'username',value:event.target.value}))  
		) ,
		onChangeSexInput:(event) => (
         dispatch(setUser({key:'sex',value:event.target.value}))
		),
		onChangeTelInput:(event) =>(
         dispatch(setUser({key:'tel',value:event.target.value}))
		),
		onChangePersonalInfoSubmit:(accountID,username,sex,tel)=>()=>{
			dispatch(changePersonalInfo(dispatch,accountID,username,sex,tel))
		}
	}),
	(stateProps, dispatchProps, ownProps) => {
		const { username,sex,tel,accountID} = stateProps;
		const { onChangePersonalInfoSubmit } = dispatchProps;
		return Object.assign({},stateProps,dispatchProps,ownProps,{
			onChangePersonalInfoSubmit:onChangePersonalInfoSubmit(accountID,username,sex,tel) 
		})		
})(ChangePersonalInfo)