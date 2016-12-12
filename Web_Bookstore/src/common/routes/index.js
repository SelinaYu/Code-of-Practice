import React from 'react';
import { Route, IndexRoute } from 'react-router';
import HomePageContainer from '../containers/HomePageContainer'
// import CheckAuth from '../components/CheckAuth';
import LoginPageContainer from '../containers/LoginPageContainer';
import Main from '../components/Main' ;
export default (
  <Route path='/' component = {Main}>
    <IndexRoute component={HomePageContainer}/>
    <Route path="/login" component={LoginPageContainer}/>
  </Route>
)