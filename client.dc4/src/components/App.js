import React, { Component } from 'react';

import DC4WebSocket from 'websockets/DC4WebSocket';

// import ExamplePage from './ExamplePage';
import HomePageContainer from 'components/HomePage/HomePageContainer';
import PlayHumanPageContainer from 'components/PlayHumanPage/PlayHumanPageContainer';
import GamePageContainer from 'components/GamePage/GamePageContainer';
import PlayBotPage from 'components/PlayBotPage';
import TestPage from 'components/TestPage';

import 'styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {currentPage: "playHuman"};
    this.socket = new DC4WebSocket();
  }

  startGame = (data) => {
    console.log("Received game start data: " + data);
    this.setState({currentPage: "game", gameStartData: data});
  }

  loadPage = (page) => {
    this.setState({currentPage: page});
  }

  renderCurrentPage = () => {
    switch(this.state.currentPage) {
      case "home":
        return (<HomePageContainer loadPage={this.loadPage} socket={this.socket} />);
      case "playHuman":
        return (<PlayHumanPageContainer loadPage={this.loadPage} startGame={this.startGame} socket={this.socket} />);
      case "game":
        return (<GamePageContainer gameStartData={this.state.gameStartData} socket={this.socket} />);
      case "playBot":
        return (<PlayBotPage />);
      case "test":
        return (<TestPage />);
      default:
        throw new Error("Unknown page: " + this.state.currentPage);
    }
  }

  render () {
    return (
      <div className="App">
        {this.renderCurrentPage()}
      </div>
    );
  }
}

export default App;
