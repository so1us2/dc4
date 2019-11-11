import React, { Component } from 'react';

import AcceptPanel from './AcceptPanel/AcceptPanel';
import AcceptPanelManager from './AcceptPanel/AcceptPanelManager';

import classes from './PlayHumanPage.css';

export default class PlayHumanPage extends Component {

  constructor(props) {
    super(props);
    this.props.manager.manageState(this);
    this.props.manager.initializeState();
  }

  renderHeader = () => (
    <div>
      <h1>Play Human Page!</h1>,
      <br/>,
      <div>Enter your name.</div>,
      <br/>
    </div>
  );

  renderButtonPanel = () => {
    if (this.state.searching) {
      return (<button className={classes.CancelButton} onClick={this.props.manager.cancelSearch}>Cancel</button>);
    } else {
      return (
        <div>
          <button onClick={this.props.manager.search}>Search</button>
          <button onClick={this.props.manager.loadHomePage}>Back to Home</button>
        </div>
      );
    }
  };

  renderInputField = () => {
    return (
      <input
        type="text"
        error={this.state.error ? "true" : undefined}
        onChange={(e) => this.props.manager.setName(e.target.value)}
      />
    )
  }

  renderAcceptPanel = () => (
    <div>
      {this.state.showAcceptPanel && <AcceptPanel manager={new AcceptPanelManager(this.manager)}/>}
    </div>
  );

  render () {
    return (
      <div className={classes.PlayHumanPage}>
        {this.renderHeader()}
        {this.renderInputField()}
        {this.renderButtonPanel()}
        {this.renderAcceptPanel()}
      </div>
    );
  }
}
