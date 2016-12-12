import React from 'react';
import { connect } from 'react-redux';
import BookBox from '../../components/BookBox';
import { browserHistory } from 'react-router';
import {
	takeToCar
}  from '../../actions';

export default connect(
  (state) => ({
    isAuthorized: state.getIn(['user', 'isAuthorized']),
    books: state.getIn(['book', 'books']),
  }),
  (dispatch) => ({
  	onTakeToCar:(books) => (bookID) => (
      dispatch(takeToCar(dispatch,bookID))
  	)
  }),
  (stateProps,dispatchProps,ownProps) => {
  	const { books } = stateProps;
  	const { onTakeToCar } = dispatchProps;
  	return Object.assign({},stateProps,dispatchProps,ownProps,{
  		onTakeToCar:onTakeToCar(books)
  	})
  }
)(BookBox);