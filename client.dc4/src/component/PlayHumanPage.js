import React, { Component } from 'react';

import classes from './PlayHumanPage.css';

export default class PlayHumanPage extends Component {

  constructor(props) {
    super(props);
    this.state = {searching: false, error: false};
    this.props.socket.listen("search", "token", this.getSearchToken)
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
  }

  getSearchToken = (data) => {
    this.token = data.token;
    console.log("Received and stored search token " + this.token);
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
  }

  getButtonPanel = () => {
    if (this.state.searching) {
      return (<button onClick={this.cancelSearch} style={{backgroundColor: "red"}}>Cancel</button>);
    } else {
      return (
        <div>
          <button onClick={this.search}>Search</button>
          <button onClick={() => {this.props.loadPage("home");}}>Back to Home</button>
        </div>
      );
    }
  }

  render () {
    return (
      <div className={classes.PlayHumanPage}>
        <h1>Play Human Page!</h1>
        <br/>
        <div>Enter your name.</div>
        <br/>
        <input
          type="text"
          error={this.state.error ? "true" : undefined}
          onChange={(e) => this.setState({name: e.target.value})}
        />
        <br/>
        {this.getButtonPanel()}
      </div>
    );
  }
}
