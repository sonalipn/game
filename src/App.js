import React from 'react';//importing all the react library functions
import logo from './logo.svg';
import './App.css';//linking app.css
import ReactDOM from 'react-dom'//importing react dom

function Square(props) {          //function that takes props as input and returns what should be rendered
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {//board extends react component
  constructor(props) {//defining constructor
    super(props);   //taking all the react properties
    this.state = {        //defining the initial state of the variables
      squares: Array(9).fill(null),//form 9 square with null value
      xIsNext: true,//initializingxIsNext to true
    };
  }

  handleClick(i) {//inbuilt event functions
    const squares = this.state.squares.slice();//slice take the portion of the array which we have selected
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';//chosing between 'x' and 'o' and set 'x'as true which is called first
    this.setState({//whenever setstate is called automatically render method is called
      squares: squares,
      xIsNext: !this.state.xIsNext,//each time player moves to next the it flipsbetween x and o
    });
  }

  renderSquare(i) {//used to show to vlues in the box
    return (
      <Square
        value={this.state.squares[i]}//the content of the ith box is assigned to the variable "value"
        onClick={() => this.handleClick(i)}//binding handleclick of the current box to onclick
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);//storing the result of the calculateWinner to constant "winner"
    let status;//declaring a variable winner
    if (winner) {//if winner is known then
      status = 'Winner: ' + winner;//displaying the winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');//if winner is not yet known then we have to ask for the next player
    }

    return (//return  the values of the each  boxes on the screen
      <div>
        <div className="status">{status}</div>
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

export default class Game extends React.Component {//making the Game class as default which extendes the ReactComponent
  render() {
    return (//calling the component class Board
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,//calling the Game cmponent class
  document.getElementById('root')
);

function calculateWinner(squares) {//finding the winner by checking the rules
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
