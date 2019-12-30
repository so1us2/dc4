import React, {Component} from "react";

import InformationPanel from './InformationPanel';
import GamePanel from './GamePanel';

import "styles/GamePage.css";

export default class GamePage extends Component {

  render() {
    console.log("Rendering GamePage with gameState:");
    console.log(this.props.gameState);
    return (
      <div className="GamePage">
        <InformationPanel gameState={this.props.gameState} container={this.props.container} />
        <GamePanel gameState={this.props.gameState}/>
      </div>
    );
  }
}
