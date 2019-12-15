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
    this.props.socket.listen("matchmaking", "accept", this.awaitAccept)
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

  awaitAccept = (data) => {
    this.setState({awaitingAccept: true});
    this.matchAcceptTransactionUUID = data.transactionUUID;
    return;
  };

  acceptMatch = () => {
    console.log("Accept method called in PlayHumanPageContainer.");
    this.props.socket.send({
      channel: "transaction",
      command: "response",
      data: {
        transactionUUID: this.matchAcceptTransactionUUID,
        response: "accept"
      }
    });
    this.setState({awaitingAccept: false});
  }

  rejectMatch = () => {
    console.log("Reject method called in PlayHumanPageContainer.");
    this.props.socket.send({
      channel: "transaction",
      command: "response",
      data: {
        transactionUUID: this.matchAcceptTransactionUUID,
        response: "reject"
      }
    });
  }

  cancelSearch = () => {
    this.setState({searching: false});
    this.props.socket.send({
      channel: "matchmaking",
      command: "cancelSearch",
      data: {
        token: this.token
      }
    });
    this.setState({awaitingAccept: false});
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
