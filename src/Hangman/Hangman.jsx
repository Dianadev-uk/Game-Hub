import React, { useState, useEffect } from "react";
import Header from "./Header";
import Figure from "./Figure";
import WrongLetters from "./WrongLetters";
import Word from "./Word";
import Popup from "./Popup";
import "./Hangman.css";

const Hangman = () => {
  const words = [
    "elephant",
    "computer",
    "rainbow",
    "guitar",
    "sunshine",
    "butterfly",
    "chocolate",
    "adventure",
    "watermelon",
    "fireworks",
  ];

  const [selectedWord, setSelectedWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [clickedLetters, setClickedLetters] = useState(new Set());

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (!clickedLetters.has(letter)) {
          setClickedLetters(new Set(clickedLetters.add(letter)));
          if (selectedWord.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable, clickedLetters, selectedWord]);

  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
    setClickedLetters(new Set());
  }

  function goToMainPage() {
    window.location.href = "/";
  }

  return (
    <>
      <div className="game-container">
        <Header />
        <Figure wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <div className="alphabet-container">
          {alphabet.map((letter) => (
            <button
              key={letter}
              className={`letter-btn ${
                clickedLetters.has(letter) ? "clicked" : ""
              }`}
              onClick={() => {
                if (playable && !clickedLetters.has(letter)) {
                  setClickedLetters(new Set(clickedLetters.add(letter)));
                  if (selectedWord.includes(letter)) {
                    setCorrectLetters((currentLetters) => [
                      ...currentLetters,
                      letter,
                    ]);
                  } else {
                    setWrongLetters((wrongLetters) => [
                      ...wrongLetters,
                      letter,
                    ]);
                  }
                }
              }}
              disabled={
                !playable ||
                correctLetters.includes(letter) ||
                wrongLetters.includes(letter)
              }
            >
              {letter}
            </button>
          ))}
        </div>
        <button className="playagain-btn" onClick={playAgain}>
          Play Again
        </button>
        <button className="return-btn" onClick={goToMainPage}>
          Main Page ⬅️
        </button>
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
    </>
  );
};

export default Hangman;
