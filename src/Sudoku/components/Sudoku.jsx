import React, { useState, useEffect } from "react";
import sudoku from "sudoku";
import "./Sudoku.css";

const initial = [
  [-1, 5, -1, 9, -1, -1, -1, -1, -1],
  [8, -1, -1, -1, 4, -1, 3, -1, 7],
  [-1, -1, -1, 2, 8, -1, 1, 9, -1],
  [5, 3, 8, 6, -1, 7, 9, 4, -1],
  [-1, 2, -1, 3, -1, 1, -1, -1, -1],
  [1, -1, 9, 8, -1, 4, 6, 2, 3],
  [9, -1, 7, 4, -1, -1, -1, -1, -1],
  [-1, 4, 5, -1, -1, -1, 2, -1, 9],
  [-1, -1, -1, -1, 3, -1, -1, 7, -1],
];

const Sudoku = () => {
  const [sudokuArr, setSudokuArr] = useState([]);
  const [sudokuBoard, setSudokuBoard] = useState([]);

  useEffect(() => {
    const newBoard = sudoku.makepuzzle();
    if (Array.isArray(newBoard) && newBoard.length === 81) {
      const puzzle = [];
      for (let i = 0; i < 9; i++) {
        puzzle.push(newBoard.slice(i * 9, (i + 1) * 9));
      }
      setSudokuBoard(puzzle);
      setSudokuArr(
        puzzle.map((row) => row.map((cell) => (cell === null ? -1 : cell)))
      );
    } else {
      console.error("Invalid format for newBoard:", newBoard);
    }
  }, []);

  function onInputChange(e, row, col) {
    const val = parseInt(e.target.value, 10) || -1;
    const grid = sudokuArr.map((row) => row.slice());
    if (val >= 1 && val <= 9) {
      grid[row][col] = val;
    } else {
      grid[row][col] = -1; // Set invalid input to -1
    }
    setSudokuArr(grid);
  }

  function resetSudoku() {
    setSudokuArr(initial.map((row) => [...row]));
  }

  function checkSudoku() {
    const flattenedBoard = sudokuArr.flat();
    if (sudoku.solvepuzzle(flattenedBoard)) {
      alert("Congratulations! Sudoku is correct!");
    } else {
      alert("Sorry, Sudoku is incorrect!");
    }
  }

  function solveSudoku() {
    const flattenedBoard = sudokuArr
      .flat()
      .map((cell) => (cell === -1 ? 0 : cell));
    console.log("Flattened Board Before Solving:", flattenedBoard);
    const solvedBoard = sudoku.solvepuzzle(flattenedBoard);

    if (solvedBoard) {
      console.log("Solved Board:", solvedBoard);
      const solvedGrid = [];
      for (let i = 0; i < 9; i++) {
        solvedGrid.push(solvedBoard.slice(i * 9, (i + 1) * 9));
      }
      console.log("Solved Grid:", solvedGrid);
      
      setSudokuBoard([solvedGrid]);
      
    } 
  }
  
   const handleBack = () => {
     window.location.href = "/";
   };


  return (
    <div className="App-header">
      <h3>Sudoku Solver</h3>
      <table>
        <tbody>
          {sudokuArr.map((row, rIndex) => (
            <tr
              key={rIndex}
              className={(rIndex + 1) % 3 === 0 ? "bBorder" : ""}
            >
              {row.map((cell, cIndex) => (
                <td
                  key={cIndex}
                  className={(cIndex + 1) % 3 === 0 ? "rBorder" : ""}
                >
                  <input
                    onChange={(e) => onInputChange(e, rIndex, cIndex)}
                    value={cell === -1 ? "" : cell}
                    className="cellInput"
                    disabled={initial[rIndex][cIndex] !== -1}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttonContainer">
        <button className="checkButton" onClick={checkSudoku}>
          Check
        </button>
        <button className="solveButton" onClick={solveSudoku}>
          Solve
        </button>
        <button className="resetButton" onClick={resetSudoku}>
          Reset
        </button>
        <div>
          <button className="back-button" onClick={handleBack}>Main Page ⬅️</button>
        </div>
      </div>
    </div>
  );
};

export default Sudoku;
