import React, { Component } from "react";
import Cell from "./cell.jsx";
import styles from "../css/master.module.css";

class Row extends Component {
  state = {
    rowData: this.props.rowData,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.rowData !== state.rowData) {
      return {
        rowData: props.rowData,
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
        />
      );
    }
    return (
      <div data-testid="row" className={styles.row}>
        {elements}
      </div>
    );
  }
}

export default Row;
