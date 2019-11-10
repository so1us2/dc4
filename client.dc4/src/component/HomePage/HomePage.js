import React, { Component } from 'react';

export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.props.manager.manageState(this);
  }

  render () {
    return (
      <div className="HomePage">
        <h1>Welcome to DC4.</h1>
        <button onClick = {this.props.manager.loadPlayHumanPage}> Play a human</button>
        <button onClick = {this.props.manager.loadPlayBotPage}> Play a bot</button>
        <button onClick = {this.props.manager.sendTest}>Send test</button>
      </div>
    );
  }
}
