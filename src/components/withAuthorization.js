import React from 'react';
import { withRouter } from 'react-router-dom';
import * as routes from '../constant/routes';
import { getFireBaseAuthObject } from '../javascripts/firebase';
import { connect } from 'react-redux';
import { addAuthUser } from '../actions/actionCreator';

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      getFireBaseAuthObject().onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          // firebase does not have auth object
          // go sign in !
          this.props.history.push(routes.SIGN_IN);
        } else if (!this.props.authUser) {
          // redux does not have auth object
          // update redux store
          // no need to go sign in
          // TODO: refactor ! this logic is duplicate with SignIn.tsx
          const customAuthUser = {
            uid: authUser.uid,
            name: authUser.displayName,
          };
          this.props.addAuthUser(customAuthUser);
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

  const mapDispatchToProps = dispatch => ({
    addAuthUser: value => dispatch(addAuthUser(value))
  });

  const withAuthorizationAndRouter = withRouter(WithAuthorization);
  const withAuthorizationAndRouterAndRedux = connect(mapStateToProps, mapDispatchToProps)(withAuthorizationAndRouter);
  return withAuthorizationAndRouterAndRedux;
}

export { withAuthorization };
