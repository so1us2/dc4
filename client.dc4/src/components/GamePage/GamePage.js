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
          position={this.props.position}
          container={this.props.container}
          lastMove={this.props.lastMove}
        />
        <GamePanel
          gameState={gameState}
          position={this.props.position}
          myTurn={gameState.currentTurn === this.props.position}
          sendMove={this.props.container.sendMove}
        />
      </div>
    );
  }
}
