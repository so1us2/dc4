import React, {Component} from "react";

import GamePanel from "./GamePanel";

export default class GamePanelContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {x: 0, y: 0, hoveredCol: null};
  }

  getBoardPosition = (evt) => {
    // mouse position on auto-scaling canvas
    // https://stackoverflow.com/a/10298843/1232793
    const svg = document.getElementById('game-panel');
    const point = svg.createSVGPoint();
    point.x = evt.clientX;
    point.y = evt.clientY;
    const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse());
    return {x, y};
  };

  onMouseMove = (evt) => {
    const {x,y} = this.getBoardPosition(evt);
    const col = Math.floor(x);
    this.setState({"x": x, "y": y});
    if (0 <= col && col < 7) {
      this.setState({"hoveredCol": col});
    } else {
      this.setState({"hoveredCol": null});
    }
  }

  onMouseOut = (evt) => {
    const {x,y} = this.getBoardPosition(evt);
    if (0 < x && x < 7 && 0 < y && y < 7) {
      return;
    } else {
      this.setState({"hoveredCol": null});
    }
  }

  onClick = (evt) => {
    if (!this.props.myTurn) {
      console.log("Ignoring click because not my turn.");
      return;
    }
    const {x,y} = this.getBoardPosition(evt);
    const col = Math.floor(x);
    if (col < 0 || col >= 7) {
      return;
    }
    this.props.sendMove(col);
  }

  render() {
    return (
      <GamePanel
        container={this}
        gameState={this.props.gameState}
        position={this.props.position}
        myTurn={this.props.myTurn}
        hoveredCol={this.state.hoveredCol}
      />
    );
  }
}
