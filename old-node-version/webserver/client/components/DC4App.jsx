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

  handlePlayHuman() {
    return () => {
      console.log("Play human handler in DC4 app.");
      this.setState({ currentPage: 'searchforopponent' });
    }
  };

  handlePlayBot() {
    return () => {
      console.log("Play bot handler in DC4 app.");
      this.setState({ currentPage: 'playbot' });
    }
  };

  handleOpponentFound() {
    return () => {
      console.log("Opponent found handler from DC4App.");
      this.setState({ currentPage: 'playhuman' });
    }
  }

  handleReturnToHomeScreen() {
    return () => {
      console.log("Return to home screen.");
      this.setState({ currentPage: 'welcome' });
    }
  }

  renderCurrentPage() {
    switch (this.state.currentPage) {
      case 'welcome':
        return (
          <WelcomePage handlePlayHuman={this.handlePlayHuman()} handlePlayBot={this.handlePlayBot()}/>
        );
      case 'playhuman':
        return (
          <PlayHumanPage handleReturnToHomeScreen={this.handleReturnToHomeScreen()} />
        );
      case 'searchforopponent':
        return (
          <OpponentSearchPage handleReturnToHomeScreen={this.handleReturnToHomeScreen()} />
        );
      case 'playbot':
        return (
          <PlayBotPage handleReturnToHomeScreen={this.handleReturnToHomeScreen()} />
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
