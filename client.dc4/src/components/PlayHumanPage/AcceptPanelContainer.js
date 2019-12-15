import React, {Component} from "react";

import AcceptPanel from "./AcceptPanel";

export default class AcceptPanelContainer extends Component {

  acceptMatch = this.props.container.acceptMatch;

  rejectMatch = this.props.container.rejectMatch;

  render() {
    if (this.props.awaitingAccept) {
      return (
        <AcceptPanel container={this} />
      );
    } else {
      return null;
    }
  }

}
