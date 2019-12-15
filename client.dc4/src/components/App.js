import React, { Component } from 'react';

import DC4WebSocket from 'websockets/DC4WebSocket';

// import ExamplePage from './ExamplePage';
import HomePageContainer from 'components/HomePage/HomePageContainer';
import PlayHumanPageContainer from 'components/PlayHumanPage/PlayHumanPageContainer';
import PlayBotPage from 'components/PlayBotPage';

import 'styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {currentPage: "home"};
    this.socket = new DC4WebSocket();
  }

  loadPage = (page) => {
    this.setState({currentPage: page});
  }

  renderCurrentPage = () => {
    switch(this.state.currentPage) {
      case "home":
        return (<HomePageContainer loadPage={this.loadPage} socket={this.socket}/>);
      case "playHuman":
        return (<PlayHumanPageContainer loadPage={this.loadPage} socket={this.socket}/>);
      case "playBot":
        return (<PlayBotPage />);
      default:
        throw new Error("Unknown page: " + this.state.currentPage);
    }
  }

  render () {
    return (
      <div className="App">
        {this.renderCurrentPage()}
      </div>
    );
  }
}

export default App;
