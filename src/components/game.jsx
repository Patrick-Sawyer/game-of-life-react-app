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
    for(let i = 0; i < 50; i++){
      for(let j = 0; j < 50; j++){}
    }
  }

  neighbours = (r, c) => {
    let array = [
      [r - 1, c - 1], 
      [r - 1, c],
      [r - 1, c + 1],
      [r, c - 1],
      [r, c + 1],
      [r + 1, c - 1],
      [r + 1, c],
      [r + 1, c + 1]
    ]

    return array.filter(function(x){
      return (0 <= x[0] && x[0] <= 49 && 0 <= x[1] && x[1] <= 49)
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
    return <div className={styles.game}>{elements}</div>;
  }
}

export default Game;