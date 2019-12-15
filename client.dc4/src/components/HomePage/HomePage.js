import React, { Component } from 'react';

export default class HomePage extends Component {
  render () {
    return (
      <div className="HomePage">
        <h1>Welcome to DC4.</h1>
        <button onClick = {this.props.container.playHuman}>Play a human</button>
        <button onClick = {this.props.container.playBot}>Play a bot</button>
        <button onClick = {this.props.container.sendTest}>Send test</button>
      </div>
    );
  }
}
