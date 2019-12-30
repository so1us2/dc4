import React, {Component} from "react";

export default class InformationPanel extends Component {
  render() {
    return (
      <div className="InformationPanel">
        <h1>Game Page</h1>
        <h3>Counter: {this.props.gameState.counter}</h3>
        <h3>Your Position: {this.props.position}</h3>
        <h3>Current Turn: {this.props.gameState.currentTurn}</h3>
        <h3>Your name: {this.props.container.getPlayerName()} </h3>
        <h3>Other player: {this.props.container.getOtherPlayerName()} </h3>
        <h3>Last move: {JSON.stringify(this.props.lastMove)} </h3>
        <div>
          <button onClick={this.props.container.incrementCounter}>Click me.</button>
        </div>
      </div>
    );
  }
}
