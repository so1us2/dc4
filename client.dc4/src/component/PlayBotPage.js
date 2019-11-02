import React, { Component } from 'react';

export default class PlayBotPage extends Component {

  playHuman = () => {
    this.props.loadPage("playHuman");
  }

  playBot = () => {
    this.props.loadPage("playBot");
  }

  render () {
    return (
      <div className="PlayBotPage">
        <h1>PlayBotPage!</h1>
      </div>
    );
  }
}
