import React, {Component} from "react";

import InformationPanel from './InformationPanel';
import GamePanel from './GamePanel'

import "styles/GamePage.css";

export default class GamePage extends Component {

  render() {
    return (
      <div className="GamePage">
        <InformationPanel counter={this.props.counter} position={this.props.position} container={this.props.container} />
        <GamePanel />
      </div>
    );
  }
}
