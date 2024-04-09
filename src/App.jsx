
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Notification from './components/Notification';
import Popup from './components/Popup';
import { showNotification as show} from './helpers/helpers';

import './App.css';


const words = ['elephant', 'computer', 'rainbow', 'guitar', 'sunshine', 'butterfly', 'chocolate', 'adventure', 'watermelon', 'fireworks'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setwrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  
  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setwrongLetters(wrongLetters => [...wrongLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
 
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    //Empty Arrays. it will clean and select another random word.
    setCorrectLetters([]);
    setwrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }
  
        
    return (
      <>
        <Header /> 
        <div className='game-container'>
          <Figure wrongLetters={wrongLetters}/>
          <WrongLetters wrongLetters={ wrongLetters } />
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </div>
        <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord}
          setPlayable={setPlayable} playAgain={playAgain} />
          <Notification showNotification={showNotification} />
      
      </>
    )
  }


export default App;