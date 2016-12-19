import React from 'react';
import { connect } from 'react-redux';
import HomePage from '../../components/HomePage';

export default connect(
  (state) => ({
  	books:state.getIn(['book','books'])
  }),
  (dispatch) => ({
  })
)(HomePage);