import React, { Component } from 'react';
import PlayHumanButton from './PlayHumanButton.jsx';
import PlayBotButton from './PlayBotButton.jsx';

export default class ButtonPanel extends Component {

  render() {
    return (
      <div className="ButtonPanel">
        <PlayHumanButton onClick={this.props.playHumanHandler}/>
        <PlayBotButton onClick={this.props.playBotHandler}/>
      </div>
    )
  }
}
