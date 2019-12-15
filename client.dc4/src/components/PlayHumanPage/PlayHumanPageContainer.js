import React, { Component } from 'react';

import PlayHumanPage from 'components/PlayHumanPage/PlayHumanPage';

export default class HomePageContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      error: false,
      awaitingAccept: false
    };
    this.props.socket.listen("search", "token", this.getSearchToken);
    this.props.socket.listen("matchmaking", "accept", this.clientAccept)
  }

  changeName = (newName) => {
    this.setState({name: newName});
  }

  search = () => {
    const name = this.state.name;
    if (!name) {
      this.setState({error:true});
      return;
    }
    console.log("Searching for an opponent!");
    this.setState({searching: true, error:false});
    console.log("Sending socket request with name: " + this.state.name);
    this.props.socket.send({
      channel: "matchmaking",
      command: "search",
      data: {
        name: this.state.name
      }
    });
  };

  getSearchToken = (data) => {
    this.token = data.token;
    console.log("Received and stored search token " + this.token);
  };

  clientAccept = (data) => {
    this.setState({awaitingAccept: true});
    return;
  };

  cancelSearch = () => {
    this.setState({searching: false});
    this.props.socket.send({
      channel: "matchmaking",
      command: "cancelSearch",
      data: {
        token: this.token
      }
    });
  }

  loadPage = this.props.loadPage;

  render () {
    return (
      <PlayHumanPage
        container={this}
        searching={this.state.searching}
        awaitingAccept={this.state.awaitingAccept}
        error={this.state.error}
      />
    );
  }
}
