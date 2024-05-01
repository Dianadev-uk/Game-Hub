
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage/components/MainPage';
import Hangman from './Hangman/Hangman';
import TicTacToe from './TicTacToe/components/TicTacToe';
import Sudoku from './Sudoku/components/Sudoku';




function App() {
  
  
  return (
    
    <Router>
      <Routes>
          <Route path="/sudoku" element={<Sudoku />} />
          <Route path="/hangman" element={<Hangman />} />
          <Route path="/TicTacToe" element={<TicTacToe />} />
          <Route path="/" element={<MainPage />} />
      </Routes>   
    </Router>
    
    )
  }


export default App;
