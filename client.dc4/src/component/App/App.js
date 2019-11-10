import React, { Component } from 'react';

import DC4WebSocket from '../websockets/DC4WebSocket';

// import ExamplePage from './ExamplePage';
import HomePage from '../HomePage/HomePage';
import HomePageManager from '../HomePage/HomePageManager';
import PlayHumanPage from '../PlayHumanPage/PlayHumanPage';
import PlayHumanPageManager from '../PlayHumanPage/PlayHumanPageManager';
import PlayBotPage from '../PlayBotPage/PlayBotPage';
import PlayBotPageManager from '../PlayBotPage/PlayBotPageManager';

import classes from './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.props.manager.manageState(this);
  }

  renderPage = () => {
    switch(this.state.currentPage) {
      case "home":
        return (<HomePage manager={new HomePageManager(this.manager)}/>);
      case "playHuman":
        return (<PlayHumanPage manager={new PlayHumanPageManager(this.manager)}/>);
      case "playBot":
        return (<PlayBotPage manager={new PlayBotPageManager(this.manager)}/>);
      default:
        throw new Error("Unknown page: " + this.state.currentPage);
    }
  }

  render () {
    return (
      <div className={classes.App}>
        {this.renderPage()}
      </div>
    );
  }
}

export default App;
