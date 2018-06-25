import React, { Component } from 'react';
import {init as firebaseInit, addNewTrip} from './javascripts/firebase';
import {Provider} from 'react-redux'
import configureStore from './components/configureStore';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    firebaseInit();
    this.store = configureStore();
  }

  add = () => {
    addNewTrip(3, "new mock 3 trip");
  }
  render() {
    return (
      <Provider store={this.store}>
        <div className="App">
          {this.add()}
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
