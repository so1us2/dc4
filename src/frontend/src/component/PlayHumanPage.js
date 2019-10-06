import React, { Component } from 'react';

export default class PlayHumanPage extends Component {

  constructor(props) {
    super(props);
    this.state = {searching: false};
  }

  search = () => {
    console.log("Searching for an opponent!");
    this.setState({searching: true});
    console.log(this.state.name);
    this.props.socket.send(JSON.stringify({command: "search", name: this.state.name}));
  }

  cancelSearch = () => {
    this.setState({searching: false});
    this.props.socket.send(JSON.stringify({command: "cancelSearch"}));
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
      <div className="PlayHumanPage">
        <h1>Play Human Page!</h1>
        <div>Enter your name.</div>
        <input
          type="text"
          onChange={(e) => this.setState({name: e.target.value})}
        /><br/>
        {this.getButtonPanel()}
      </div>
    );
  }
}
