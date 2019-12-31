import React, {Component} from "react";

export default class Pieces extends Component {

  expand = (moveHistory) => {
    let ret = [];
    moveHistory.forEach(move => {
      ret.push({...move, row: this.columnCounts[move.column]++});
    });
    return ret;
  }

  render() {
    this.columnCounts = [0,0,0,0,0,0,0];
    this.expandedMoves = this.expand(this.props.gameState.moveHistory);
    let ret = [];
    this.expandedMoves.forEach((move, i) => {
      ret.push(
        <GamePiece column={move.column} row={move.row} position={move.position} key={i} />
      );
    });
    console.log(ret);
    return ret;
  }
}

class GamePiece extends Component {
  getColor = () => {
    return (this.props.position === "FIRST") ? "red" : "black";
  }

  render() {
    return (
      <circle cx={(this.props.column + 0.5).toString()} cy={(6 - this.props.row + 0.5).toString()} r="0.4" fill={this.getColor()}/>
    );
  }
}
