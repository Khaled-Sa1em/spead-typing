import React, { useState, useRef, useEffect } from 'react'

function useSpeedTypingGame(time) {
  // constant
  let gameTime = time

  // states
  const [words, setWords] = useState('')
  const [wordsCount, setWordsCount] = useState(0)
  const [isTimeRemaining, setIsTimeRemaining] = useState(gameTime)
  const [isStarted, setIsStarted] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [isDark, setIsDark] = useState(true)

  const textAreaRef = useRef()

  function typingHandle() {
    setWords(textAreaRef.current.value)
    console.log(textAreaRef.current.value)
  }

  function calcWordsCount() {
    const words = textAreaRef.current.value
      .trim()
      .replace(/\n+/g, ' ')
      .split(' ')
    const newWords = words.filter((word) => (word === ' ' ? '' : word))
    console.log('Words count', newWords)
    setWordsCount(newWords.length)
  }

  function changeTheme() {
    setIsDark((prev) => !prev)
  }

  useEffect(() => {
    if (isTimeRemaining > 0 && isStarted) {
      setTimeout(() => {
        setIsTimeRemaining((prev) => prev - 1)
      }, 1000)
    } else if (isTimeRemaining === 0) {
      setIsStarted(false)
      // setIsDisabled(true)
      textAreaRef.current.disabled = true
      calcWordsCount()
    }
  }, [isStarted, isTimeRemaining])

  function startTyping() {
    console.log('here')
    setIsStarted((prev) => {
      // setIsDisabled(false)
      textAreaRef.current.disabled = false
      textAreaRef.current.focus()
      if (!isStarted && isTimeRemaining !== gameTime) {
        setIsTimeRemaining(gameTime)
        setWords('')
        textAreaRef.current.disabled = false
        textAreaRef.current.focus()
        // async job
        // setIsDisabled(() => {
        //   textAreaRef.current.focus()
        //   return false
        // })
      } else if (isStarted) {
        setIsDisabled(true)
      }
      return !prev
    })
  }

  return {isDark,wordsCount,changeTheme,startTyping,isStarted,isDisabled,words,textAreaRef,typingHandle,isTimeRemaining}
}

export default useSpeedTypingGame