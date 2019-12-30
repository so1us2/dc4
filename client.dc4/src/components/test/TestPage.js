import React, {Component} from "react";

import "styles/App.css";
import "styles/test/TestPage.css"

export default class TestPage extends Component {

  reconnectPlayer1 = this.props.reconnectPlayer1;

  reconnectPlayer2 = this.props.reconnectPlayer2;

  render() {
    return (
      <div className="TestPage">
        <button onClick={this.reconnectPlayer1}>Player 1</button>
        <button onClick={this.reconnectPlayer2}>Player 2</button>
      </div>
    );
  }
}
