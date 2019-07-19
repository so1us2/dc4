import React, { Component } from 'react';

import css from './play-human-page.css'

export default class PlayHumanPage extends Component {

  doAdditionalFunStuff() {
    return () => {
      console.log("Doing additional fun stuff from play human page before leaving.");
      this.props.returnToHomeScreenHandler();
    }

  }

  render() {
    return (
      <div className="DC4Page PlayHumanPage">
        <h1>Play human page!</h1>
        <button onClick={this.doAdditionalFunStuff()}>Return to home screen.</button>
      </div>
    )
  }

}
