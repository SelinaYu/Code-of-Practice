import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { fromJS } from 'immutable';
import configureStore from '../common/store/configureStore';
import routes from '../common/routes';
//server端传递过来的
const initialState =  window.__PRELOADED_STATE__;

const store = configureStore(fromJS(initialState));
ReactDOM.render(
  <Provider store = {store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app')
)