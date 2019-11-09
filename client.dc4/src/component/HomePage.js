import React, { Component } from 'react';

export default class HomePage extends Component {

  playHuman = () => {
    this.props.loadPage("playHuman");
  }

  playBot = () => {
    this.props.loadPage("playBot");
  }

  sendTest = () => {
    this.props.socket.send({
      channel: "test",
      command: "test",
      data: {payload: "payload 1"}
    });
  }

  render () {
    return (
      <div className="HomePage">
        <h1>Welcome to DC4.</h1>
        <button onClick = {this.playHuman}>Play a human</button>
        <button onClick = {this.playBot}>Play a bot</button>
        <button onClick = {this.sendTest}>Send test</button>
      </div>
    );
  }
}
