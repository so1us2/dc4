import React, {Component} from "react";

export default class ConnectFourBoard extends Component {
  renderCells() {
    let ret = [];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6; j++) {
        ret.push(<BoardCell col={i} row={j} key={6*i + j}/>);
      }
    }
    return ret;
  }
  render() {
    return (
      <svg viewBox="0 0 7 6" x="0" y="1" width="7" height="6">
        {this.renderCells()}
      </svg>
    )
  }
}

class BoardCell extends Component {
  render() {
    return (
      <svg viewBox="0 0 1 1" x={this.props.col.toString()} y={(5 - this.props.row).toString()} width="1" height="1" >
        <g fill="blue" stroke="none">
          // top-half
          <path d="M 0,0 L 0,0.5 L 0.1 0.5 A 0.4,0.4 0,0,1 0.9,0.5 L 1,0.5 L 1,0 z" />
          // bottom-half
          <path d="M 0,1 L 0,0.5 L 0.1 0.5 A 0.4,0.4 0,0,0 0.9,0.5 L 1,0.5 L 1,1 z" />
        </g>
      </svg>
    )
  }
}
