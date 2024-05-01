import React from 'react';

const BoardCell = ({ value, onClick }) => {
    let cellClass = 'button';
    if (value === 'X') {
        cellClass += ' x';
    } else if (value === 'O') {
        cellClass += ' o';
    }
  return (
      <button className={cellClass} onClick={onClick}>
          {value}
    </button>
  )
}

export default BoardCell;