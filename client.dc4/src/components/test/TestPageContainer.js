import React, {Component} from "react";

import TestPage from "components/test/TestPage";

export default class TestPageContainer extends Component {

  constructor(props) {
    super(props);
    console.log("TestPageContainer constructor.");
    this.socket = props.socket;
    this.gameUUID = "1e38af78-1b9f-4bae-923e-20661a0a3058";
    this.player1UUID = "f7038575-526a-4293-aa3e-0b5d8564a1f9";
    this.player2UUID = "353582ca-67e2-4f18-87ac-4591809d516a";
  }

  reconnectPlayer1 = () => {
    const gameStartData = {
      gameUUID: this.gameUUID,
      playerUUID: this.player1UUID,
      position: "FIRST"
    };
    this.socket.send({
      channel: "game",
      command: "reconnect",
      data: gameStartData
    });
    this.props.startGame(gameStartData);
  }

  reconnectPlayer2 = () => {
    const gameStartData = {
      gameUUID: this.gameUUID,
      playerUUID: this.player2UUID,
      position: "SECOND"
    };
    this.socket.send({
      channel: "game",
      command: "reconnect",
      data: gameStartData
    });
    this.props.startGame(gameStartData);
  }

  render() {
    return (
      <TestPage
        container={this}
        reconnectPlayer1={this.reconnectPlayer1}
        reconnectPlayer2={this.reconnectPlayer2}
      />
    )
  }

}
