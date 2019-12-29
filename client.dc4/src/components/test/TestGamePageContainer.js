import React, {Component} from "react";

import GamePageContainer from "components/GamePage/GamePageContainer";

export default class TestGamePageContainer extends Component {

  render() {
    return (
      <GamePageContainer gameStartData={this.gameStartData} socket={this.props.socket} />
    )
  }

}
