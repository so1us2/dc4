import React, { Component } from 'react';

import 'styles/PlayHumanPage.css';

export default class PlayHumanPage extends Component {

  renderButtonPanel = () => {
    if (this.props.searching) {
      return (
        <button className="cancel-search" onClick={this.props.container.cancelSearch}>Cancel</button>
      );
    } else {
      return (
        <div>
          <button onClick={this.props.container.search}>Search</button>
          <button onClick={() => this.props.container.loadPage("home")}>Back to Home</button>
        </div>
      );
    }
  }

  render () {
    return (
      <div className="PlayHumanPage">
        <h1>Play Human Page!</h1>
        <br/>
        <div>Enter your name.</div>
        <br/>
        <input
          type="text"
          error={this.props.error ? "true" : undefined}
          onChange={(e) => this.props.container.changeName(e.target.value)}
        />
        <br/>
        {this.renderButtonPanel()}
        {this.props.awaitingAccept ? <AcceptPanel socket={this.props.socket} /> : null}
      </div>
    );
  }
}
