import React from 'react';
import { withRouter } from 'react-router-dom';
import * as routes from '../constant/routes';
import { getFireBaseAuthObject } from '../javascripts/firebase';
import AuthUserContext from './AuthUserContext';

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      getFireBaseAuthObject().onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }
    render() {
      return (
        // since redirect is handle in ComponentDidMount
        // we need folowing Context to prevent the page to render before getting redirected
        <AuthUserContext.Consumer>
          {authUser => authUser ? <Component /> : null}       
        </AuthUserContext.Consumer>
      );
    }
  }
  return withRouter(WithAuthorization);
}

export { withAuthorization };
