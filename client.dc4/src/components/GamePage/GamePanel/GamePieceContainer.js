import React, {Component} from "react";

import GamePiece from "./GamePiece";

export default class GamePieceContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      x: props.column + 0.5,
      y: 6.5 - props.row,
      currentY: 6.5 - props.row,
      color: props.position === "FIRST" ? "red" : "black"
    }
  }

  componentDidMount() {
    if (this.props.shouldAnimate) {
      this.dropPiece();
    }
  }

  dropPiece = () => {
    let startTime;
    let duration = 300;
    let yStart = 0;
    let yEnd = this.state.y;

    const updateFrame = (timestamp) => {
      const runtime = timestamp - startTime;
      let progress = runtime / duration;
      progress = Math.min(progress, 1);
      this.setState({
        currentY: yStart * (1-progress) + yEnd * progress
      });
      // Force update?
      if (runtime < duration) {
        window.requestAnimationFrame(updateFrame);
      }
    }

    window.requestAnimationFrame((timestamp) => {
      startTime = timestamp;
      updateFrame(timestamp);
    });
  }

  render() {
    return (
      <GamePiece
        x={this.state.x}
        y={this.state.currentY}
        r="0.5"
        color={this.state.color}
      />
    )
  }

}
