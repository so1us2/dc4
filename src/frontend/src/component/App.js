import React, { Component } from 'react';
import ExamplePage from './ExamplePage'
import classes from './App.css';

class App extends Component {

  socket = new WebSocket('ws://127.0.0.1:39142');

  render () {
    return (
      <div className={classes.App}>
        <ExamplePage socket={this.socket}/>
      </div>
    );
  }
}

export default App;
