import React from "react";
import Game from "./components/game.jsx";

function App() {
  return (
    <div>
    <center>
      <header className="header">
        <br></br>
        <h1>GAME OF LIFE</h1>
        <p>Press randomize and then play to get started.</p>
        <p>Click near stuck cells to get them moving again</p>
        <br></br>
      </header>
      <Game />
      <br></br>
      </center>
    </div>
  );
}

export default App;
