import React from 'react';
import {connect} from 'react-redux';
import ViewBookstoreInfo from '../../components/ViewBookstoreInfo';

export default connect(
  (state)=> ({
   name:state.getIn(['bookStore','name']),
   addr:state.getIn(['bookStore','addr']),
   tele:state.getIn(['bookStore','tele'])
  }),
  (dispatch) => ({
  })
)(ViewBookstoreInfo)