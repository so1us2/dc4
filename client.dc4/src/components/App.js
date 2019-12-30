import React, { Component } from 'react';

import DC4WebSocket from 'websockets/DC4WebSocket';

import HomePageContainer from 'components/HomePage/HomePageContainer';
import PlayHumanPageContainer from 'components/PlayHumanPage/PlayHumanPageContainer';
import GamePageContainer from 'components/GamePage/GamePageContainer';
import PlayBotPage from 'components/PlayBotPage';
import TestPageContainer from 'components/test/TestPageContainer';

import 'styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: "test", // Sets which page to load.
    };
    this.socket = new DC4WebSocket();
  }

  startGame = (data) => {
    console.log("Received game start data: ");
    console.log(data);
    this.setState({
      currentPage: "game",
      gameUUID: data.gameUUID,
      playerUUID: data.playerUUID,
      position: data.position,
      gameState: data.gameState
    });
  }

  loadPage = (page) => {
    this.setState({currentPage: page});
  }

  renderCurrentPage = () => {
    switch(this.state.currentPage) {
      case "home":
        return (
          <HomePageContainer
            loadPage={this.loadPage}
            socket={this.socket}
          /> );
      case "playHuman":
        return (
          <PlayHumanPageContainer
            loadPage={this.loadPage}
            startGame={this.startGame}
            socket={this.socket}
          />);
      case "game":
        return (
          <GamePageContainer
            gameState={this.state.gameState}
            gameUUID={this.state.gameUUID}
            playerUUID={this.state.playerUUID}
            position={this.state.position}
            socket={this.socket}
          />);
      case "playBot":
        return (<PlayBotPage />);
      case "test":
        return (
          <TestPageContainer
            startGame={this.startGame}
            socket={this.socket}
          />);
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
