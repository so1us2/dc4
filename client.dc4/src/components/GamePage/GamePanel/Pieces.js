import React, {Component} from "react";

import GamePieceContainer from "./GamePieceContainer";

export default class Pieces extends Component {

  constructor(props) {
    super(props);
    this.state = {animateLastMove:false};
  }

  componentDidUpdate(prevProps) {
    if (this.props.gameState.moveHistory.length > prevProps.gameState.moveHistory.length ) {
      console.log("Received a new move.  Starting animation in Pieces component.");
      this.setState({animateLastMove:true});
    }
  }

  expand = (moveHistory) => {
    const ret = [];
    const columnCounts = [0,0,0,0,0,0,0];
    let i = 0;
    moveHistory.forEach(move => {
      ret.push({
        ...move,
        row: columnCounts[move.column]++,
        index: i++
      });
    });
    return ret;
  }

  renderOldMoves = () => {
    const expandedMoves = this.expand(this.props.gameState.moveHistory);
    this.lastMove = expandedMoves.pop();
    const ret = [];
    expandedMoves.forEach((move, i) => {
      const {column, row, position, index} = move;
      ret.push(
        <GamePieceContainer column={column} row={row} position={position} key={index} shouldAnimate={false}/>
      );
    });
    return ret;
  }

  renderLastMove = () => {
    if (!this.lastMove) {
      return;
    }
    const {column, row, position, index} = this.lastMove;
    return (
      <GamePieceContainer column={column} row={row} position={position} key={index} shouldAnimate={true} />
    )
  }

  render() {
    return [
      ...this.renderOldMoves(),
      this.renderLastMove()
    ];
  }
}
