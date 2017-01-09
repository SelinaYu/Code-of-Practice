import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { browserHistory } from 'react-router';

export default function requireAuthentication(Component,type){
  class AuthenticatedComponent extends React.Component{
  componentWillMount(){
    this.checkAuth();
  }
  componentWilReceiveProps(nextProps){
        this.checkAuth();
  }
  checkAuth(){
    if(type =='auth'){
      if(!this.props.isAuthorized){
        this.props.router.push('/login');
      }
      }
    }
  render() {
    return (
        <div>
          <Component {...this.props } /> 
        </div>
   )
  }
  };
const mapStateToProps = (state) => ({
  isAuthorized: state.getIn(['user','isAuthorized'])
});
return connect(mapStateToProps)(withRouter(AuthenticatedComponent));
}