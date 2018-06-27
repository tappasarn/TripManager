import React from 'react';
import { withRouter } from 'react-router-dom';
import * as routes from '../constant/routes';
import { getFireBaseAuthObject } from '../javascripts/firebase';

// still need more logic the prevent component from 
// rendering before verification step in componentDidMount
const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      getFireBaseAuthObject().onAuthStateChanged(authUser => {
        console.log(authUser);
        if (!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }
    render() {
      return <Component />;
    }
  }
  return withRouter(WithAuthorization);
}

export { withAuthorization };
