import React from 'react';
import {connect} from 'react-redux';
import ViewBookstoreInfo from '../../components/ViewBookstoreInfo';

export default connect(
  (state)=> ({
   name:state.getIn(['bookstore','name']),
   addr:state.getIn(['bookstore','addr']),
   tele:state.getIn(['bookstore','tele'])
  }),
  (dispatch) => ({
  })
)(ViewBookstoreInfo)