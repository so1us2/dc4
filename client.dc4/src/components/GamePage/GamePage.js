import React, {Component} from "react";

import InformationPanel from './InformationPanel';
import GamePanel from './GamePanel';

import "styles/GamePage.css";

export default class GamePage extends Component {

  render() {
    let gameState = this.props.gameState
    return (
      <div className="GamePage">
        <InformationPanel
          gameState={gameState}
          container={this.props.container}
        />
        <GamePanel
          gameState={gameState}
          myTurn={gameState.currentTurn === gameState.position}
        />
      </div>
    );
  }
}
