import React, { Component } from 'react';

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
    this.state = this.props.manager.getInitialState();
  }

  renderPage = () => {
    switch(this.state.currentPage) {
      case "home":
        return (<HomePage manager={new HomePageManager(this.props.manager)}/>);
      case "playHuman":
        return (<PlayHumanPage manager={new PlayHumanPageManager(this.props.manager)}/>);
      case "playBot":
        return (<PlayBotPage manager={new PlayBotPageManager(this.props.manager)}/>);
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
