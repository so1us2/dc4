import React, { Component } from 'react';

import DC4WebSocket from 'websockets/DC4WebSocket';

// import ExamplePage from './ExamplePage';
import HomePage from 'components/HomePage';
import PlayHumanPage from 'components/PlayHumanPage';
import PlayBotPage from 'components/PlayBotPage';


import classes from 'styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {currentPage: "home"};
    this.socket = new DC4WebSocket();
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
