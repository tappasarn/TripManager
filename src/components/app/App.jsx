import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { withAuthentication } from '../withAuthentication';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import { init as firebaseInit } from '../../javascripts/firebase';
import configureStore from '../configureStore';
import { Home } from '../home/Home';
import { SignIn } from '../signIn/SignIn';
import * as routes from '../../constant/routes';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    firebaseInit();
    this.store = configureStore();
  }

  render() {
    return (
      <Provider store={this.store}>
        <Router>
          <div>
            <Route
              exact path={routes.SIGN_IN}
              component={() => <SignIn />}
            />
            <Route
              exact path={routes.HOME}
              component={() => <Home />}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export { App };
