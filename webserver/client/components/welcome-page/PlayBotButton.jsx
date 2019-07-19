import React, { Component } from 'react';

export default class PlayBotButton extends Component {

  render() {
    return (
        <button className="PlayBotButton" onClick={this.props.onClick}>Play Bot</button>
    )
  }
}
