import React, {Component} from "react";

import GamePage from "./GamePage";

export default class GamePageContainer extends Component {

  constructor(props) {
    super(props);
    console.log("GamePageContainer constructor.  Props: ");
    console.log(props);
    this.state = {
      gameState: this.props.gameState,
      lastMove: null,
      moveAnimationStatus: "STOP"
    };
    this.props.socket.listen("game", "testResponse", this.testResponseHandler);
    this.props.socket.listen("game", "move", this.moveHandler);
  }

  incrementCounter = () => {
    this.props.socket.send({
      channel: "game",
      command: "testRequest",
      data: {
        gameUUID: this.props.gameUUID,
        playerUUID: this.props.playerUUID,
        a: 42
      }
    });
  }

  sendMove = (col) => {
    this.props.socket.send({
      channel: "game",
      command: "move",
      data: {
        gameUUID: this.props.gameUUID,
        playerUUID: this.props.playerUUID,
        move: {
          position: this.props.position,
          column: col
        }
      }
    });
  }

  getPlayerName = () => {
    if (this.props.position === "FIRST") {
      return (this.props.gameState.player1.name);
    } else {
      return (this.props.gameState.player2.name);
    }
  }

  getOtherPlayerName = () => {
    if (this.props.position === "FIRST") {
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

  moveHandler = (data) => {
    this.setState({
      gameState: data.gameState,
      lastMove: data.move
    });
  }

  render() {
    console.log("Rendering GamePageContainer.  Here is this:");
    console.log(this);
    return (
      <GamePage
          container={this}
          gameState={this.state.gameState}
          position={this.props.position}
          lastMove={this.state.lastMove}
      />
    );
  }
}
