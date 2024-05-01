import React, {useState} from 'react'

import './ResetButton.css'



const ResetButton = ({ resetBoard }) => {
  const [isStarted, setIsStarted] = useState(false);

  const handleBack = () => {
    window.location.href = "/";
  };

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleEnd = () => {
    setIsStarted(false);
    resetBoard();
  }
  return (
    <>
      {isStarted ? (
        <>
          <button className="reset-btn" onClick={resetBoard}>Reset</button>
          <button className="reset-btn" onClick={handleEnd}>End Game</button>
        </>
      ) : (
        <button className="reset-btn" onClick={handleStart}>Start</button>
      )}
      <button className="back" onClick={handleBack}>Main Page ⬅️</button>
    </>
  );
};

export default ResetButton;