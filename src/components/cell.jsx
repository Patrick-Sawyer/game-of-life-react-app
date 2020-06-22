import React, { Component } from "react";
import styles from "../css/master.module.css";

class Cell extends Component {
  state = {
    cellState: this.props.cellState,
    rowNumber: this.props.rowNumber,
    cellNumber: this.props.cellNumber,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.cellState !== state.cellState) {
      return {
        cellState: props.cellState,
      };
    }
    return null;
  }

  handleClick = () => {
    this.props.updateGrid(
      this.state.rowNumber,
      this.state.cellNumber,
      !this.state.cellState
    );
  };

  getCell = () => {
    if (this.state.cellState === true) {
      return (
        <div
          className={styles.live}
          data-cy={"r" + this.state.rowNumber + "c" + this.state.cellNumber}
          data-testid="cell"
          onClick={this.handleClick}
        ></div>
      );
    } else {
      return (
        <div
          className={styles.dead}
          data-cy={"r" + this.state.rowNumber + "c" + this.state.cellNumber}
          data-testid="cell"
          onClick={this.handleClick}
        ></div>
      );
    }
  };

  render() {
    return this.getCell();
  }
}

export default Cell;
