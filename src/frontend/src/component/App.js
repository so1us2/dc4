import React, { Component } from 'react';

import DC4WebSocket from '../websockets/DC4WebSocket';

// import ExamplePage from './ExamplePage';
import HomePage from './HomePage';
import PlayHumanPage from './PlayHumanPage';
import PlayBotPage from './PlayBotPage';


import classes from './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {currentPage: "home"};
    this.socket = new DC4WebSocket();
    this.socket.onmessage = this.onmessage;
  }

  onmessage = (event) => {
    console.log("Received an message from server! Here it is:");
    console.log(event);
  }

  loadPage = (page) => {
    this.setState({currentPage: page});
  }

  renderCurrentPage = () => {
    switch(this.state.currentPage) {
      case "home":
        return (<HomePage loadPage={this.loadPage} socket={this.socket}/>);
      case "playHuman":
        return (<PlayHumanPage loadPage={this.loadPage} socket={this.socket}/>);
      case "playBot":
        return (<PlayBotPage />);
      default:
        throw new Error("Unknown page: " + this.state.currentPage);
    }
  }

  render () {
    return (
      <div className={classes.App}>
        {this.renderCurrentPage()}
      </div>
    );
  }
}

export default App;
