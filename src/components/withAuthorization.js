import React from 'react';
import { withRouter } from 'react-router-dom';
import * as routes from '../constant/routes';
import { getFireBaseAuthObject } from '../javascripts/firebase';
import { connect } from 'react-redux';

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      getFireBaseAuthObject().onAuthStateChanged(authUser => {
        if (!authCondition(authUser) || !this.props.authUser) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }
    render() {
      return (
        // since redirect is handle in ComponentDidMount
        // we need folowing authUser value from the store to prevent the page to render before getting redirected
        <React.Fragment>
          {this.props.authUser ? <Component /> : null}       
        </React.Fragment>
      );
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      authUser: state.user.authUser,
    };
  };
  
  const withAuthorizationAndRouter = withRouter(WithAuthorization);
  const withAuthorizationAndRouterAndRedux = connect(mapStateToProps)(withAuthorizationAndRouter);
  return withAuthorizationAndRouterAndRedux;
}

export { withAuthorization };
