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

    this.socket.listen("game", "reconnect", this.props.startGame);
  }

  reconnect = (playerUUID) => {
    // The server will send back a game:reconnect message with the relevant data.
    this.socket.send({
      channel: "game",
      command: "reconnect",
      data: {
        gameUUID: this.gameUUID,
        playerUUID: playerUUID
      }
    });
  }

  reconnectPlayer1 = () => {
    this.reconnect(this.player1UUID);
  }

  reconnectPlayer2 = () => {
    this.reconnect(this.player2UUID);
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
