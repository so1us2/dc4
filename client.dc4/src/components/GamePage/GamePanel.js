import React, {Component} from "react";

export default class GamePanel extends Component {
  render() {
    return (
      <div className="GamePanel">
        <svg viewBox="0 0 7 7" width="500px" height="500px">
          <ConnectFourBoard />
          <Pieces gameState={this.props.gameState} />
          <Arrows />
        </svg>
      </div>
    )
  }
}

class ConnectFourBoard extends Component {
  renderCells() {
    let ret = [];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6; j++) {
        ret.push(<BoardCell col={i} row={j} />);
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

class Pieces extends Component {
  render() {
    return null;
  }
}

class Arrows extends Component {
  renderArrows() {
    let ret = [];
    for (let i = 0; i < 7; i++) {
      ret.push(<Arrow col={i} />);
    }
    return ret;
  }
  render() {
    return (
      <svg viewBox="0 0 7 1" x="0" y="0" width="7" height="1">
        {this.renderArrows()}
      </svg>
    )
  }
}

class Arrow extends Component {
  render() {
    return (
      <svg x={this.props.col} width="1" height="1">
        <g>
          <path d="m0.29523,0.20324c0.40758,-0.00195 0.40563,-0.00195 0.40487,-0.00238c-0.00076,-0.00043 0.00076,0.50357 0,0.50314c-0.00076,-0.00043 0.10217,-0.00152 0.10141,-0.00195c-0.00076,-0.00043 -0.30346,0.20324 -0.30422,0.20282c-0.00076,-0.00043 -0.29956,-0.20434 -0.30032,-0.20477c-0.00076,-0.00043 0.10607,0.00238 0.10531,0.00195c-0.00076,-0.00043 -0.00704,-0.49881 -0.00704,-0.49881z" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0.005" stroke="#000000" fill="#007f00"/>
        </g>
      </svg>
    );
  }
}
