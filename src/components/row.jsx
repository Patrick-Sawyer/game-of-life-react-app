import React, { Component } from "react";
import Cell from "./cell.jsx";
import styles from "../css/master.module.css";

class Row extends Component {
  state = {
    rowData: this.props.rowData,
    gamePlaying: this.props.gamePlaying,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.rowData !== state.rowData) {
      return {
        rowData: props.rowData,

      };
    }
    if (props.gamePlaying !== state.gamePlaying) {
      return {
        gamePlaying: props.gamePlaying,
      };
    }

    return null;
  }

  render() {
    let elements = [];
    for (let i = 0; i < 50; i++) {
      elements.push(
        <Cell
          key={i}
          rowNumber={this.props.rowNumber}
          cellNumber={i}
          cellState={this.state.rowData[i]}
          updateGrid={this.props.updateGrid}
          gamePlaying={this.state.gamePlaying}
        />
      );
    }
    return <div className={styles.row}>{elements}</div>;
  }
}

export default Row;
