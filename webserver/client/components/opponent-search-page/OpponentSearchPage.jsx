import React, { Component } from 'react';
import ClientSocket from 'Webserver/client/sockets/ClientSocket.js';
Promise = require('promise');

import css from './opponent-search-page.css'

export default class OpponentSearchPage extends Component {

  doAdditionalFunStuff() {
    return () => {
      console.log("Doing additional fun stuff from opponent search page.");
      this.props.returnToHomeScreenHandler();
    }
  }

  componentDidMount() {
    this.socket = new ClientSocket();
    this.socket.connect();

    new Promise((response, json) => setTimeout(response, 2000)).then(() => {
      console.log("Finished waiting.  Gonna try something now.");
      this.socket.emitEvent('testevent', {}, () => { console.log("testevent callback called!"); });
    })
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
