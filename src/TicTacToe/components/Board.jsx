import React from 'react'
import TicTacToe from './TicTacToe';
import './Board.css';



const Board = ({ board, onClick }) => {
    return (
        <div className='board'>
            {board.map((value, index) => {
                return <TicTacToe value={value} onClick={() => value === null && onClick(index)} />
            })}
            </div>
  )
}

export default Board;