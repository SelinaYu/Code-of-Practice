import React from 'react';
import { connect } from 'react-redux';
import AppBar from '../../components/AppBar';
import { browserHistory } from 'react-router';

import {
	startLogout
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
       isAuthorized?browserHistory.push('/account/changePassword'):null
    },
    onChangePersonalInfo:(isAuthorized) => ()=>{
       isAuthorized?browserHistory.push('/account/changePersonalInfo'):null
    },
    onRecharge:(isAuthorized) => ()=>{
       isAuthorized?browserHistory.push('/account/recharge'):null
    },
    onOrder:(isAuthorized) => ()=>{
       isAuthorized?browserHistory.push('/account/order'):null
    },
    onBuyCar:(isAuthorized) => ()=>{
       isAuthorized?browserHistory.push('/account/buycar'):null
    },  
    onManageStaff:(isAuthorized) => ()=>{
       isAuthorized?browserHistory.push('/manage/staff'):null
    },    
    onManageBookstore:(isAuthorized) => ()=>{
       isAuthorized?browserHistory.push('/manage/bookstore'):null
    },  
    onManageBook:(isAuthorized) => ()=>{
       isAuthorized?browserHistory.push('/manage/book'):null
    },
    onBookstore:() => ()=>{
       browserHistory.push('/ViewBookstoreInfo')
    },
  }),
  (stateProps, dispatchProps, ownProps) => {
    const { isAuthorized, username ,accountRight } = stateProps;
    const { 
      onChangePassword,
      onChangePersonalInfo, 
      onRecharge,
      onOrder,
      onBuyCar,
      onManageStaff,
      onManageBookstore,
      onManageBook,
      onBookstore
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
      onBookstore:onBookstore()
    });
  }
)(AppBar);

