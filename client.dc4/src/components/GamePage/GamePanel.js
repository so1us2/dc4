import React, {Component} from "react";

export default class GamePanel extends Component {

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
    console.log("Rendering GamePanel with gameState:");
    console.log(this.props.gameState);
    return (
      <div className="GamePanel">
        <svg
            id="game-panel"
            viewBox="0 0 7 7"
            width="500px"
            height="500px"
            onMouseMove={this.onMouseMove}
            onMouseOut={this.onMouseOut}
            onClick={this.onClick}
        >
          <ConnectFourBoard />
          <Pieces gameState={this.props.gameState} />
          {(this.props.myTurn) ? <Arrows hoveredCol={this.state.hoveredCol} /> : null}
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

class Pieces extends Component {

  expand = (moveHistory) => {
    let ret = [];
    moveHistory.forEach(move => {
      ret.push({...move, row: this.columnCounts[move.column]++});
    });
    return ret;
  }

  render() {
    console.log("Rendering Pieces with gameState:");
    console.log(this.props.gameState);
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

class Arrows extends Component {
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
