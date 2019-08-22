import React, { Component } from 'react';

export default class PlayHumanButton extends Component {

  render() {
    return (
      <button className="PlayHumanButton" onClick={this.props.onClick}>Play Human</button>
    )
  }
}
