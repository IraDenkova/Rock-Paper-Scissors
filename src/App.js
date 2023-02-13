
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Game from './Components/Game'
import Home from './Components/Home'
import Choice from './Components/Choice'


function App() {

  const [userChoice, setUserChoice] = useState(null)
  const [score, setScore] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Choice' element={<Choice setUserChoice={setUserChoice} />} />
        <Route path='/Game' element={<Game userChoice={userChoice} score={score} setScore={setScore} />} />
      </Routes>
    </div>
  );
}

export default App;
