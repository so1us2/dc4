import React, {Component} from "react";

export default class Arrows extends Component {
  renderArrows() {
    let ret = [];
    for (let i = 0; i < 7; i++) {
      ret.push(<Arrow col={i} key={i} hovered={this.props.hoveredCol==i}/>);
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
    if (!this.props.hovered) {
      return null;
    } else {
      return (
        <svg x={this.props.col} width="1" height="1">
          <g>
            <path d="m0.29523,0.20324c0.40758,-0.00195 0.40563,-0.00195 0.40487,-0.00238c-0.00076,-0.00043 0.00076,0.50357 0,0.50314c-0.00076,-0.00043 0.10217,-0.00152 0.10141,-0.00195c-0.00076,-0.00043 -0.30346,0.20324 -0.30422,0.20282c-0.00076,-0.00043 -0.29956,-0.20434 -0.30032,-0.20477c-0.00076,-0.00043 0.10607,0.00238 0.10531,0.00195c-0.00076,-0.00043 -0.00704,-0.49881 -0.00704,-0.49881z"
            strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0.005" stroke="#000000" fill="#007f00"/>
          </g>
        </svg>
      );
    }
  }
}
