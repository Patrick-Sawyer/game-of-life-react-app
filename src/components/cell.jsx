import React, { Component } from "react";
import styles from "../css/master.module.css";

class Cell extends Component {
  state = {
    cellState: this.props.cellState,
    gamePlaying: this.props.gamePlaying,
    rowNumber: this.props.rowNumber,
    cellNumber: this.props.cellNumber,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.cellState !== state.cellState) {
      return {
        cellState: props.cellState,
      };
    }
    if (props.gamePlaying !== state.gamePlaying) {
      return {
        gamePlaying: props.gamePlaying,
      };
    }
    return null;
  }

  handleClick = () => {
    this.props.updateGrid(this.state.rowNumber, this.state.cellNumber, !this.state.cellState);
  };

  getCell = () => {
    if (this.state.cellState == true) {
      return <div className={styles.live} onClick={this.handleClick}></div>;
    } else {
      return <div className={styles.dead} onClick={this.handleClick}></div>;
    }
  };

  render() {
    return this.getCell();
  }
}

export default Cell;
