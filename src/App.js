import React, { useState, useRef, useEffect } from 'react'
// my speed typing game hook
import useSpeedTypingGame from './Hooks/useSpeedTypingGame'
import './App.css'

function App() {
  // speed typing game hook
  const {
    isDark,
    wordsCount,
    changeTheme,
    startTyping,
    isStarted,
    isDisabled,
    words,
    textAreaRef,
    typingHandle,
    isTimeRemaining,
  } = useSpeedTypingGame(10)

  return (
    <div className="App">
      <div
        className={
          isDark ? 'container raw dark-theme' : 'container raw light-theme'
        }
      >
        <button className="theme-btn" onClick={changeTheme}>
          {isDark ? '☀️' : '🌑'}
        </button>
        <h1 className="txt title">Typing speed</h1>
        <textarea
          disabled={isDisabled}
          className="textArea"
          value={words}
          ref={textAreaRef}
          onChange={typingHandle}
        />
        <p className="txt">Remaining time : {isTimeRemaining}</p>
        <button onClick={startTyping} className="btn">
          {!isStarted ? 'Start' : 'Stop'}
        </button>
        <p className="txt">words Count : {wordsCount} </p>
      </div>
    </div>
  )
}

export default App
