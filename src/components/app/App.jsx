import React, { Component } from 'react';
import {Provider} from 'react-redux'
import {init as firebaseInit} from '../../javascripts/firebase';
import configureStore from '../configureStore';
import logo from '../../logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    firebaseInit();
    this.store = configureStore();
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </Provider>
    );
  }
}

export default App;
