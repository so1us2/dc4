import React, { Component } from 'react';
import WelcomePage from './welcome-page/WelcomePage';
import PlayHumanPage from './play-human-page/PlayHumanPage';
import OpponentSearchPage from './opponent-search-page/OpponentSearchPage';
import PlayBotPage from './play-bot-page/PlayBotPage';

import css from './css/DC4App.css';

export default class DC4App extends Component {

  constructor(props) {
    super(props);
    this.state = { currentPage: 'welcome' };
  }

  playHumanHandler() {
    return () => {
      console.log("Play human handler in DC4 app.");
      this.setState({ currentPage: 'searchforopponent' });
    }

  };

  playBotHandler() {
    return () => {
      console.log("Play bot handler in DC4 app.");
      this.setState({ currentPage: 'playbot' });
    }
  };

  returnToHomeScreenHandler() {
    return () => {
      console.log("Return to home screen.");
      this.setState({ currentPage: 'welcome' });
    }
  }

  renderCurrentPage() {
    switch (this.state.currentPage) {
      case 'welcome':
        return (
          <WelcomePage playHumanHandler={this.playHumanHandler()} playBotHandler={this.playBotHandler()}/>
        );
      case 'playhuman':
        return (
          <PlayHumanPage returnToHomeScreenHandler={this.returnToHomeScreenHandler()} />
        );
      case 'searchforopponent':
        return (
          <OpponentSearchPage returnToHomeScreenHandler={this.returnToHomeScreenHandler()} />
        );
      case 'playbot':
        return (
          <PlayBotPage returnToHomeScreenHandler={this.returnToHomeScreenHandler()} />
        );
      default:
        throw new Exception("Unknown current page!  Critical Error!");
    }

  }

  render() {
    return (
      <div className="DC4App">
        {this.renderCurrentPage()}
      </div>
    )
  }
}
