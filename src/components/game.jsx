import React, { Component } from "react";
import Row from "./row.jsx";
import styles from "../css/master.module.css";
import update from "react-addons-update";

let initialState = [];

const row = new Array(50).fill(false);

for (let i = 0; i < 50; i++) {
  initialState.push(row);
}

class Game extends Component {
  state = {
    grid: initialState,
    gamePlaying: false,
    interval: null
  };

  randomize = () => {
    let randomGrid = []
    for(let i = 0; i < 50; i++){
      let randomRow = []
      for(let j = 0; j < 50; j++){
        if(Math.random() < 0.5){
          randomRow.push(true) 
        } else {
          randomRow.push(false)
        }  
      }
      randomGrid.push(randomRow)
    }
   this.setState({
    grid: randomGrid
   })
  }

  updateGrid = (rowIndex, cellIndex, value) => {
    this.setState(state =>({
        grid : state.grid.map((arr, i) => arr.map((item, j) =>{
          if(i == rowIndex && j == cellIndex){
            return value
          }else{
            return item
          }
        }))
    }))
  }

  clear = () => {
    let newState = initialState.map(function(arr) {
      return arr.slice();
    });
    this.setState({
    grid: newState
   })
  }

  numberOfLiveNeighbours = (r, c) => {
    let array = [
      [r - 1, c - 1], 
      [r - 1, c],
      [r - 1, c + 1],
      [r, c - 1],
      [r, c + 1],
      [r + 1, c - 1],
      [r + 1, c],
      [r + 1, c + 1]
    ];

    return array.filter(function(x){
      return (0 <= x[0] && x[0] <= 49 && 0 <= x[1] && x[1] <= 49)
    }).map(neighbour => {
        return this.state.grid[neighbour[0]][neighbour[1]]
    }).filter(function(x){
      return (x == true)
    }).length;
  }

  tick = () => {

    let newState = initialState.map(function(arr) {
      return arr.slice();
    });

    for(let i = 0; i < 50; i++){
      for(let j = 0; j < 50; j++){
        let neighbours = this.numberOfLiveNeighbours(i, j);
        if(this.state.grid[i][j] == true){
          if(neighbours == 2 || neighbours == 3){
            newState[i][j] = true
          }
        }else if(neighbours == 3){
          newState[i][j] = true
        }
      }
    }

    this.setState({
      grid: newState
    })
  }

  playOrPause = () => {
    if(this.state.gamePlaying){
      return 'STOP'
    }else{
      return 'PLAY'
    }
  }

  play = () => {
    if(this.state.gamePlaying == false){
      this.setState({
        interval: setInterval(() => this.tick(), 100)
      })
    }else{
      clearInterval(this.state.interval)
    }
    this.setState({
      gamePlaying: !this.state.gamePlaying
    })
  }

  render() {
    let elements = [];
    for (let i = 0; i < 50; i++) {
      elements.push(
        <Row
          key={i}
          rowNumber={i}
          rowData={this.state.grid[i]}
          updateGrid={this.updateGrid}
          gamePlaying={this.state.gamePlaying}
        />
      );
    }
    return (

    <div>
      <header className="header">
        <h1>GAME OF LIFE</h1>
        <p>Press randomize and then play to get started.</p>
        <p>Click near stuck cells to get the moving again</p>
        <br></br>
      </header>
      <div className={styles.game}>{elements}</div>
      <br></br>
      <button className={styles.button} onClick={this.play}>{this.playOrPause()}</button>
      <button className={styles.button} onClick={this.randomize}>RANDOMIZE</button>
      <button className={styles.button} onClick={this.clear}>CLEAR</button>
    </div>)
  }
}

export default Game;