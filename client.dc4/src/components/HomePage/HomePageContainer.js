import React, { Component } from 'react';

import HomePage from 'components/HomePage/HomePage';
export default class HomePageContainer extends Component {

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
      <HomePage container={this} />
    );
  }
}
