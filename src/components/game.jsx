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
  };

  updateGrid = (rowIndex, cellIndex, value) => {
    this.setState(state =>({
        grid : state.grid.map((arr, i) => arr.map((item,j) =>{
          if(i == rowIndex && j == cellIndex){
            return value
          }else{
            return item
          }
        }))
    }))
  }

  tick = () => {

    let currentState = this.state.grid;

    for(let rowIndex = 0; rowIndex < 50; rowIndex++){
      for(let cellIndex = 0; cellIndex < 50; cellIndex++){
        let neighbours = this.numberOfLiveNeighbours(rowIndex, cellIndex)
        if(currentState[rowIndex][cellIndex] == true){
          if(neighbours < 2){
            currentState[rowIndex][cellIndex] = false
          }
          if(neighbours > 3){
            currentState[rowIndex][cellIndex] = false
          }
        }else{
          if(neighbours == 3){
            currentState[rowIndex][cellIndex] = true
          }
        }
      }
    }

    this.setState({
      grid: currentState
    })
  }

  numberOfLiveNeighbours = (rowIndex, cellIndex) => {
    let array = [
      [rowIndex - 1, cellIndex - 1], 
      [rowIndex - 1, cellIndex],
      [rowIndex - 1, cellIndex + 1],
      [rowIndex, cellIndex - 1],
      [rowIndex, cellIndex + 1],
      [rowIndex + 1, cellIndex - 1],
      [rowIndex + 1, cellIndex],
      [rowIndex + 1, cellIndex + 1]
    ];

    return array.filter(function(x){
      return (0 <= x[0] && x[0] <= 49 && 0 <= x[1] && x[1] <= 49)
    }).map(neighbour => {
        return this.state.grid[neighbour[0]][neighbour[1]]
    }).filter(function(x){
      return (x == true)
    }).length;
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
    return <div className={styles.game}>{elements}</div>;
  }
}

export default Game;