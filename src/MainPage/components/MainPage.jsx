import React from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  return (
    <>
    <div className="main-page-container">
      <div className="header">
        <h1>Game Hub 🖊️</h1>
        <h2>Welcome to the Game Hub page ! </h2>
        <h2>Here you can find three of the most exciting games!</h2>
        <h2>Practice and have fun 🚀📝▶️</h2>
        <h3>Choose one of the following options:</h3>
      </div>
      <div className="cards-container">
        <Link to="/hangman" className="card">
          <h2>HANGMAN</h2>
          <p>Click to explore game</p>
        </Link>
        <Link to="/TicTacToe" className="card">
          <h2>TIC-TAC-TOE</h2>
          <p>Click to explore game</p>
        </Link>
        <Link to="/sudoku" className="card">
          <h2>SUDOKU</h2>
          <p>Click to explore game</p>
        </Link>
      </div>
      </div>
      </>
  );
};

export default MainPage;
