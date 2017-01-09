import React from 'react';
import { Route, IndexRoute } from 'react-router';
import HomePageContainer from '../containers/HomePageContainer'
import LoginPageContainer from '../containers/LoginPageContainer';
import RegisterPageContainer from '../containers/RegisterPageContainer';
import ViewBookstoreInfoContainer from '../containers/ViewBookstoreInfoContainer';
import ChangePasswordContainer from '../containers/ChangePasswordContainer';
import ChangePersonalInfoContainer from '../containers/ChangePersonalInfoContainer';
import CheckAuth from '../components/CheckAuth';
import Main from '../components/Main' ;

export default (
  <Route path='/' component = {Main}>
    <IndexRoute component={HomePageContainer}/>
    <Route path="/login" component={LoginPageContainer}/>
    <Route path="/register" component={RegisterPageContainer}/>
    <Route path="/ViewBookstoreInfo" component={CheckAuth(ViewBookstoreInfoContainer,'guest')}/>
    <Route path="/account/changePassword" component ={CheckAuth(ChangePasswordContainer,'auth')}/>
    <Route path="/account/changePersonalInfo" component={CheckAuth(ChangePersonalInfoContainer,'auth')}/>
  </Route>
)