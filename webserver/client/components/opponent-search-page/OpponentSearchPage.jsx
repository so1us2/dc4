import React, { Component } from 'react';

import css from './opponent-search-page.css'

export default class OpponentSearchPage extends Component {

  doAdditionalFunStuff() {
    return () => {
      console.log("Doing additional fun stuff from opponent search page.");
      this.props.returnToHomeScreenHandler();
    }
  }

  render() {
    return (
      <div className="DC4Page OpponentSearchPage">
        <h1>Searching for opponent...</h1>
        <button onClick={this.doAdditionalFunStuff()}>Return to home screen</button>
      </div>
    )
  }

}
