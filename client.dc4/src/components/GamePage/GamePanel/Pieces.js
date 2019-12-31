import React, {Component} from "react";

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
      ret.push(
        <GamePiece column={move.column} row={move.row} position={move.position} key={move.index} />
      );
    });
  }

  renderLastMove = () => {
    return (
      <AnimatingGamePiece column={move.column} row={move.row} position={move.position} key={move.index}  />
    )
  }

  render() {
    return [
      ...this.renderOldMoves(),
      this.renderLastMove()
    ];
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

class AnimatingGamePiece extends Component {
  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="falling-piece"
        transitionAppear={true}
      >
        <div>Not yet implemented.</div>
      </ReactCSSTransitionGroup>  
    )

  }
}
