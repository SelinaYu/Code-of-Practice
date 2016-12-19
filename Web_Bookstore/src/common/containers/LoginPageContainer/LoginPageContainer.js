import React from 'react';
import { connect } from 'react-redux';
import LoginPage from '../../components/LoginPage';
import { 
  authStart,
  setUser,
} from '../../actions';
export default connect(
  (state) => ({
     username:state.getIn(['user','username']),
     password:state.getIn(['user','password'])
  }),
  (dispatch) => ({
  	onChangeUsernameInput:(event) => (
      dispatch(setUser({key:'username',value:event.target.value}))
  	),
  	onChangePasswordInput:(event) => (
      dispatch(setUser({key:'password',value:event.target.value})) 
   	),
   	onLoginSubmit:(username,password) => () => {
   		dispatch(authStart(dispatch,username,password))
   	}
  }),
  (stateProps,dispatchProps,ownProps) => {
  	const {username,password} = stateProps;
  	const {onLoginSubmit} = dispatchProps;
  	return Object.assign({},stateProps,dispatchProps,ownProps,{
  		onLoginSubmit:onLoginSubmit(username,password)
  	})
  }
)(LoginPage);

