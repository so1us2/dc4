import React, { Component } from 'react';
// import ExamplePage from './ExamplePage';
import HomePage from './HomePage';
import PlayHumanPage from './PlayHumanPage';
import PlayBotPage from './PlayBotPage';
import classes from './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {currentPage: "home"};
  }

  socket = new WebSocket('ws://127.0.0.1:39142');

  loadPage = (page) => {
    this.setState({currentPage: page});
  }

  renderCurrentPage = () => {
    switch(this.state.currentPage) {
      case "home":
        return (<HomePage loadPage={this.loadPage}/>);
      case "playHuman":
        return (<PlayHumanPage />);
      case "playBot":
        return (<PlayBotPage />);
      default:
        throw new Error("Unknown page: " + this.state.currentPage);
    }
  }

  render () {
    return (
      <div className={classes.App}>
        {this.renderCurrentPage()}
      </div>
    );
  }
}

export default App;
