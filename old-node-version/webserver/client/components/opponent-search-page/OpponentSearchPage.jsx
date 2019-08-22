import React, { Component } from 'react';
import ClientSocket from 'Webserver/client/sockets/ClientSocket.js';

import css from './opponent-search-page.css'

export default class OpponentSearchPage extends Component {

  componentDidMount() {
    this.socket = new ClientSocket();
    this.socket.connect();
    this.socket.emitEvent('joinopponentsearch', {}, () => { console.log("callback from joinopponentsearch emit."); });
  }

  handleOpponentFound() {
    return (data) => {
      console.log("Handling opponent found.  Passed data:");
      console.log(data);
      this.props.onOpponentFound();
    }
  }

  handleCancelButtonClick() {
    return () => {
      console.log("Doing additional fun stuff from opponent search page");
      this.socket.emitEvent('cancelopponentsearch', {}, () => { console.log("callback from cancelopponentsearch emit."); });
      this.props.handleReturnToHomeScreen();
    };
  }

  render() {
    return (
      <div className="DC4Page OpponentSearchPage">
        <h1>Searching for opponent...</h1>
        <button onClick={this.handleCancelButtonClick()}>
          Return to home screen
        </button>
      </div>
    )
  }

}
