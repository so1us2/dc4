import React, {Component} from "react";

import "styles/popup.css";

export default class AcceptPanel extends Component {

  render() {
    return (
      <div className="popup">
        <h1>Hello world this is message.</h1>
        <div className="buttonPanel">
          <button onClick={this.props.container.acceptMatch}>Accept</button>
          <button onClick={this.props.container.rejectMatch}>Reject</button>
        </div>
      </div>
    )
  }

}
