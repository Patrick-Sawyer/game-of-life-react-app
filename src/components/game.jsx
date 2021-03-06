import React, { Component } from "react";
import Row from "./row.jsx";
import styles from "../css/master.module.css";

const row = new Array(50).fill(false);
const initialState = new Array(50).fill(row);

class Game extends Component {
  state = {
    grid: initialState,
    gamePlaying: false,
    interval: null,
  };

  randomize = () => {
    let randomGrid = [];
    for (let i = 0; i < 50; i++) {
      let randomRow = [];
      for (let j = 0; j < 50; j++) {
        if (Math.random() < 0.3) {
          randomRow.push(true);
        } else {
          randomRow.push(false);
        }
      }
      randomGrid.push(randomRow);
    }
    this.setState({
      grid: randomGrid,
    });
  };

  updateGrid = (rowIndex, cellIndex, value) => {
    this.setState((state) => ({
      grid: state.grid.map((arr, i) =>
        arr.map((item, j) => {
          if (i === rowIndex && j === cellIndex) {
            return value;
          } else {
            return item;
          }
        })
      ),
    }));
  };

  clear = () => {
    this.setState({
      grid: initialState,
    });
  };

  numberOfLiveNeighbours = (r, c) => {
    let array = [
      [r - 1, c - 1],
      [r - 1, c],
      [r - 1, c + 1],
      [r, c - 1],
      [r, c + 1],
      [r + 1, c - 1],
      [r + 1, c],
      [r + 1, c + 1],
    ];

    return array
      .filter(function (x) {
        return 0 <= x[0] && x[0] <= 49 && 0 <= x[1] && x[1] <= 49;
      })
      .map((neighbour) => {
        return this.state.grid[neighbour[0]][neighbour[1]];
      })
      .filter(function (x) {
        return x === true;
      }).length;
  };

  tick = () => {
    let newState = initialState.map(function (arr) {
      return arr.slice();
    });

    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
        let neighbours = this.numberOfLiveNeighbours(i, j);
        if (this.state.grid[i][j] === true) {
          if (neighbours === 2 || neighbours === 3) {
            newState[i][j] = true;
          }
        } else if (neighbours === 3) {
          newState[i][j] = true;
        }
      }
    }

    this.setState({
      grid: newState,
    });
  };

  playOrPause = () => {
    if (this.state.gamePlaying) {
      return "STOP";
    } else {
      return "PLAY";
    }
  };

  play = () => {
    if (this.state.gamePlaying === false) {
      this.setState({
        interval: setInterval(() => this.tick(), 100),
      });
    } else {
      clearInterval(this.state.interval);
    }
    this.setState({
      gamePlaying: !this.state.gamePlaying,
    });
  };

  render() {
    let elements = [];
    for (let i = 0; i < 50; i++) {
      elements.push(
        <Row
          data-testid="row"
          key={i}
          rowNumber={i}
          rowData={this.state.grid[i]}
          updateGrid={this.updateGrid}
        />
      );
    }
    return (
      <div data-testid="game" data-cy="game">
        <div className={styles.game}>{elements}</div>
        <br></br>
        <div className={styles.buttons}>
          <button
            data-cy="playOrPause"
            className={styles.button}
            onClick={this.play}
          >
            {this.playOrPause()}
          </button>
          <br className="break"></br>
          <br className="break"></br>
          <button
            data-cy="randomize"
            className={styles.button}
            onClick={this.randomize}
          >
            RANDOMIZE
          </button>
          <br className="break"></br>
          <br className="break"></br>
          <button
            data-cy="clear"
            className={styles.button}
            onClick={this.clear}
          >
            CLEAR
          </button>
          <br></br>
        </div>
      </div>
    );
  }
}

export default Game;
