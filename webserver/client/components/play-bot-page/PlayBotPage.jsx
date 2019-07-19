import React, { Component } from 'react';

import css from './play-bot-page.css'

export default class PlayBotPage extends Component {

  doAdditionalFunStuff() {
    return () => {
      console.log("Doing additional fun stuff from play bot page.");
      this.props.returnToHomeScreenHandler();
    }
  }
  render() {
    return (
      <div className="DC4Page PlayBotPage">
        <h1>Play bot page!</h1>
        <button onClick={this.doAdditionalFunStuff()}>Return to home screen.</button>
      </div>
    )
  }

}
