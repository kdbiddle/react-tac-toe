import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square (props) {
    //No constructor necessary here, because Square doesn't store state. It is passed down from Board.
    //NOTE: This was changed from a class to a function, because it doesn't have state and is therefore a functional component.
    return (
    <button className="square" onClick={props.onClick}>
        {props.value}
    </button>
    );
  };
  
  //Board is the parent of Square (9 squares make up a board)
  class Board extends React.Component {   
    renderSquare(i) {
        return <Square
            //props passed from Board to Square instance, accessible by this.props in Square class
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            />;
    }
  
    render() {
        return (
        <div>
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true
        }
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        const squares = current.squares.slice();

        if (squares[i] || calculateWinner(squares)) {
            //If this square has been set or we have a winner, return.
            return;
        }
        //Set the square that was clicked to have value 'X'
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        //Calculate status
        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        }
        else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
        <div className="game">
            <div className="game-board">
            <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
            />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
            </div>
        </div>
        );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
      const lines = [
        //Horizontal lines
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        //Vertical lines
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        //Diagonals
        [0, 4, 8],
        [2, 4, 6]
      ];

      for (let i = 0, l = lines.length; i < l; i++) {
          //Assign constants a, b, & c to the respective int in the lines array
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              //If the value in the first square on this line equals the second and third, we have made a line of X || O
              //We found a match, return this value as the winner!
              return squares[a];
          }
      }
      return null;
  }