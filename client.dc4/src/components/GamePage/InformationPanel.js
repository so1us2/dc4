import React, {Component} from "react";

export default class InformationPanel extends Component {

  render() {
    return (
      <div className="InformationPanel">
        <h1>Game Page</h1>
        <h3>Counter: {this.props.counter}</h3>
        <h3>Position: {this.props.position}</h3>
        <h3>Your name: we haven't implemented this yet.</h3>
        <h3>Other player: we haven't implemented this yet.</h3>
        <div>
          <button onClick={this.props.container.incrementCounter}>Click me.</button>
        </div>
      </div>
    );
  }
}
