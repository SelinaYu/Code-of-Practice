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
  }),
  (dispatch) => ({
  	onLogout:() => (
      dispatch(startLogout(dispatch))
  	)
  })
)(AppBar);

