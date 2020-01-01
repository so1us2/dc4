import React, {Component} from "react";

export default class GamePiece extends Component {
  render() {
    return (
      <circle cx={this.props.x.toString()} cy={this.props.y.toString()} r="0.4" fill={this.props.color}/>
    );
  }
}
