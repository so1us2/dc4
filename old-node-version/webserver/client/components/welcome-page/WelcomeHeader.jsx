import React, { Component } from 'react';

export default class WelcomeHeader extends Component {

  render() {
    return (
      <div className="WelcomeHeader">
        <h2 id="welcome-header-1" data-text="Welcome to">Welcome to</h2>
        <h1 id="welcome-header-2" data-text="Deep Connect 4">Deep Connect 4</h1>
      </div>
    )
  }
}
