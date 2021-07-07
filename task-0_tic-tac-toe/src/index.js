import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  render() {
    return <div>{this.renderTable(this.props.highlightArray)}</div>;
  }

  renderTable(highlightArray) {
    let table = [];
    let row = [];

    for (let i = 0; i < 8; i += 3) {
      for (let j = 0; j < 3; j++) {
        row.push(this.renderSquare(i + j, highlightArray));
      }
      table.push(<div className='board-row'>{row}</div>);
      row = [];
    }
    return table;
  }

  renderSquare(cell, highlightArray) {
    let isHighlighted;
    if (highlightArray === null) {
      isHighlighted = false;
    } else if (highlightArray.includes(cell)) {
      isHighlighted = true;
    } else {
      isHighlighted = false;
    }

    let buttonClass;
    if (isHighlighted) {
      buttonClass = "square square-highlight";
    } else {
      buttonClass = "square";
    }
    return (
      <Square
        value={this.props.squares[cell]}
        onClick={() => this.props.onClick(cell)}
        className={buttonClass}
      />
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          currentPlayer: null,
          clickedCell: null,
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          currentPlayer: this.state.xIsNext ? "X" : "O",
          clickedCell: i,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const highlightArray = calculateHighlight(current.squares);
    const cellCoordinates = [
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 2],
      [2, 3],
      [3, 1],
      [3, 2],
      [3, 3],
    ];

    const moves = history.map((step, move) => {
      const currentPlayer = history[move].currentPlayer;
      const desc = move
        ? `Go to move #${move} - ${currentPlayer} on [${
            cellCoordinates[history[move].clickedCell]
          }]`
        : "Go to game start";

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (!winner && this.state.stepNumber === 9) {
      status = "It's a draw!";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className='flex-container'>
        <div className='game'>
          <div className='game-board'>
            <Board
              squares={current.squares}
              highlightArray={highlightArray}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className='game-info'>
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculateHighlight(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
