import React from 'react';
import { Route, IndexRoute } from 'react-router';
import HomePageContainer from '../containers/HomePageContainer'
import LoginPageContainer from '../containers/LoginPageContainer';
import RegisterPageContainer from '../containers/RegisterPageContainer';
import ViewBookstoreInfoContainer from '../containers/ViewBookstoreInfoContainer';
import Main from '../components/Main' ;

export default (
  <Route path='/' component = {Main}>
    <IndexRoute component={HomePageContainer}/>
    <Route path="/login" component={LoginPageContainer}/>
    <Route path="/register" component={RegisterPageContainer}/>
    <Route path="/ViewBookstoreInfo" component={ViewBookstoreInfoContainer}/>
  </Route>
)