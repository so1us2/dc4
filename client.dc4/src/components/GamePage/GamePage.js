import React, {Component} from "react";

import InformationPanel from './InformationPanel';
import GamePanel from './GamePanel';

import "styles/GamePage.css";

export default class GamePage extends Component {

  constructor(props) {
    this.state = {moveAnimationStatus: props.moveAnimationStatus};
  }

  render() {
    let gameState = this.props.gameState;
    console.log("rendering GamePage with gameState:");
    console.log(gameState);
    return (
      <div className="GamePage">
        <InformationPanel
          gameState={this.props.gameState}
          position={this.props.position}
          container={this.props.container}
          lastMove={this.props.lastMove}
        />
        <GamePanel
          gameState={this.props.gameState}
          position={this.props.position}
          myTurn={gameState.currentTurn === this.props.position}
          sendMove={this.props.container.sendMove}
          moveAnimationStatus={this.state.moveAnimationStatus}
        />
      </div>
    );
  }
}
