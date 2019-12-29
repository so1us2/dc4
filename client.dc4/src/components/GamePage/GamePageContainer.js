import React, {Component} from "react";

import GamePage from "./GamePage";

export default class GamePageContainer extends Component {

  constructor(props) {
    super(props);
    console.log("GamePageContainer constructor.  Props: ");
    console.log(props);
    this.gameUUID = props.gameStartData.gameUUID;
    this.playerUUID = props.gameStartData.playerUUID;
    this.position = props.gameStartData.position;
    this.state = {counter: 0};
    this.props.socket.listen("game", "testResponse", this.testResponseHandler);
  }

  incrementCounter = () => {
    this.props.socket.send({
      channel: "game",
      command: "testRequest",
      data: {
        gameUUID: this.gameUUID,
        playerUUID: this.playerUUID,
        a: 42
      }
    });
  };

  testResponseHandler = (data) => {
    this.setState({counter: data.counter});
  }

  render() {
    return (
      <GamePage container={this} position={this.position} counter={this.state.counter} gameState={{message: "hello world."}}/>
    );
  }
}
