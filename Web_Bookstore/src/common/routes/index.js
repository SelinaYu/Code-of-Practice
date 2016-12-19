import React from 'react';
import { Route, IndexRoute } from 'react-router';
import HomePageContainer from '../containers/HomePageContainer'
import LoginPageContainer from '../containers/LoginPageContainer';
import RegisterPageContainer from '../containers/RegisterPageContainer';

import Main from '../components/Main' ;
export default (
  <Route path='/' component = {Main}>
    <IndexRoute component={HomePageContainer}/>
    <Route path="/login" component={LoginPageContainer}/>
    <Route path="/register" component={RegisterPageContainer}/>
  </Route>
)