import React from 'react';
import { connect } from 'react-redux';
import AppBar from '../../components/AppBar';
import { browserHistory } from 'react-router';

import {
	startLogout,
	setUi
} from '../../actions';
export default connect(
  (state) => ({
  	isAuthorized: state.getIn(['user','isAuthorized']),
    username: state.getIn(['user','username']),
    accountRight:state.getIn(['user','accountRight'])
  }),
  (dispatch) => ({
  	onLogout:() => (
      dispatch(startLogout(dispatch))
  	),
    onChangePassword:(isAuthorized) => ()=>{
       isAuthorized?browserHistory.push('/account/changePassword'):browserHistory.push('/login')
    },
    onChangePersonalInfo:(isAuthorized) => ()=>{
       isAuthorized?browserHistory.push('/account/changePersonalInfo'):browserHistory.push('/login')
    },
    onRecharge:(isAuthorized) => ()=>{
       isAuthorized?browserHistory.push('/account/recharge'):browserHistory.push('/login')
    },
    onOrder:(isAuthorized) => ()=>{
       isAuthorized?browserHistory.push('/account/order'):browserHistory.push('/login')
    },
    onBuyCar:(isAuthorized) => ()=>{
       isAuthorized?browserHistory.push('/account/buycar'):browserHistory.push('/login')
    },  
    onManageStaff:(isAuthorized) => ()=>{
       isAuthorized?browserHistory.push('/manage/staff'):browserHistory.push('/login')
    },    
    onManageBookstore:(isAuthorized) => ()=>{
       isAuthorized?browserHistory.push('/manage/bookstore'):browserHistory.push('/login')
    },  
    onManageBook:(isAuthorized) => ()=>{
       isAuthorized?browserHistory.push('/manage/book'):browserHistory.push('/login')
    },
  }),
  (stateProps, dispatchProps, ownProps) => {
    const { isAuthorized, username ,accountRight} = stateProps;
    const { 
      onChangePassword,
      onChangePersonalInfo, 
      onRecharge,
      onOrder,
      onBuyCar,
      onManageStaff,
      onManageBookstore,
      onManageBook
    } = dispatchProps;
    return Object.assign({}, stateProps, dispatchProps, ownProps, {
      onChangePassword: onChangePassword(isAuthorized),
      onChangePersonalInfo: onChangePersonalInfo(isAuthorized),
      onRecharge: onRecharge(isAuthorized),
      onOrder: onOrder(isAuthorized),
      onBuyCar: onBuyCar(isAuthorized),
      onManageStaff: onManageStaff(isAuthorized),
      onManageBookstore: onManageBookstore(isAuthorized),
      onManageBook: onManageBook(isAuthorized),
    });
  }
)(AppBar);

