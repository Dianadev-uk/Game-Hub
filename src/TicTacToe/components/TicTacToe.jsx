import React, { useState } from "react";
import ScoresBoard from "./ScoresBoard";
import ResetButton from "./ResetButton";
import BoardCell from "./BoardCell";

import './TicTacToe.css';


const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleBoardClick = (boxIdx) => {
    // Step 1: Update the board
    const updatedBoard = board.map((value, index) => {
      if (index === boxIdx) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    });

    setBoard(updatedBoard);

    // Step 2: Check if either player has won the game
    const winner = checkWinner(updatedBoard);

    if (winner) {
      // Update scores if there is a winner
      if (winner === "O") {
        setScores((prevScores) => ({
          ...prevScores,
          oScore: prevScores.oScore + 1,
        }));
      } else if (winner === "X") {
        setScores((prevScores) => ({
          ...prevScores,
          xScore: prevScores.xScore + 1,
        }));
      }
      // Reset the board
      resetBoard();
     
    } else {
      // If no winner, continue the game
      setXPlaying(!xPlaying);
    }
    
  };
      
  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      console.log('Checking combination:', board[x], board[y], board[z]);

      // Iterate through win conditions and check if either player satisfies
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true); 
        return board[x];
      }
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  return (
    <>
      <div className="body-container">
      <ScoresBoard scores={scores} xPlaying={xPlaying} />
      <p className="player-turn">It's {xPlaying ? "X" : "O"}'s turn !</p>
      <div className="board-container">
        {board.map((value, index) => (
          <BoardCell
            key={index}
            value={value}
            onClick={() => handleBoardClick(index)}
          />
        ))}
      </div>
        <ResetButton resetBoard={resetBoard} />
        </div>
    </>
  );
};

export default TicTacToe;
