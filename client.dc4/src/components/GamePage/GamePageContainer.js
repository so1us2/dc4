import React, {Component} from "react";

import GamePage from "./GamePage";

export default class GamePageContainer extends Component {

  constructor(props) {
    super(props);
    console.log("GamePageContainer constructor.  Props: ");
    console.log(props);
    this.state = {gameState: this.props.gameState};
    this.props.socket.listen("game", "testResponse", this.testResponseHandler);
  }

  incrementCounter = () => {
    this.props.socket.send({
      channel: "game",
      command: "testRequest",
      data: {
        gameUUID: this.props.gameState.gameUUID,
        playerUUID: this.props.gameState.playerUUID,
        a: 42
      }
    });
  }

  getPlayerName = () => {
    if (this.props.gameState.position === "FIRST") {
      return (this.props.gameState.player1.name);
    } else {
      return (this.props.gameState.player2.name);
    }
  }

  getOtherPlayerName = () => {
    if (this.props.gameState.position === "FIRST") {
      return (this.props.gameState.player2.name);
    } else {
      return (this.props.gameState.player1.name);
    }
  }

  testResponseHandler = (data) => {
    this.setState({
      gameState: {
        ...this.state.gameState,
        counter: data.counter
      }
    });
  }

  render() {
    return (
      <GamePage container={this} gameState={this.state.gameState}/>
    );
  }
}
