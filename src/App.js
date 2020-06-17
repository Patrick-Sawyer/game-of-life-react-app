import React from "react";
import Game from "./components/game.jsx";
import styles from "./css/master.module.css";

function App() {
  return (
    <div>
      <header className="header">
        <h1>Game of Life</h1>
      </header>
      <p>Please click on some squares and press start.</p>
      <br></br>
      <Game />
      <br></br>
    </div>
  );
}

export default App;
