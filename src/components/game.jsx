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
        ...state,
        grid : state.grid.map((arr, i) => arr.map((item,j) =>{
          if(i == rowIndex && j == cellIndex){
            return value
          }else{
            return item
          }
        }))
    }))
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