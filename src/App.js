import React, {useState, useEffect} from "react";
import Die from "./Components/Die";
import {nanoid} from "nanoid"
import Confetti from "react-confetti";  

function App() {

  const [diceNums, setDiceNums] = useState(allNewDice())

  const [tenzies, setTenzies] = useState(false)

  const [diceRoll, setDiceRoll] = useState(0)



  useEffect(() => {
    const allHeld = diceNums.every((die) => die.isHeld)
    const firstValue = diceNums[0].value
    const allSameValue = diceNums.every((die) => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [diceNums])


  function allNewDice() {
    const newDice = []
    for (let i=0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return(newDice)
  }

  function generateNewDie() {
    let randomNum = Math.ceil((Math.random() * 6))
    return {value: randomNum, 
      isHeld: false,
      id: nanoid()}
  }

  function rollDice() {
    setDiceRoll((count) => count += 1)
    if (!tenzies) {
      setDiceNums((oldDice) => oldDice.map((die) => {
        return die.isHeld ? 
          die : 
          generateNewDie()
      }))
    } else {
        setTenzies(false)
        setDiceNums(allNewDice())
    } 
  }

  function holdDice(id) {
    setDiceNums((oldDice) => oldDice.map((die) => {
      return die.id === id ? 
        {...die, isHeld: !die.isHeld} :
        die
    }) )
  }

    
  const diceElements = diceNums.map((die) => {
    return <Die 
      value={die.value} 
      isHeld={die.isHeld} 
      key={die.id}
      holdDice={() => holdDice(die.id)}
    />
  })


  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="game-title">Tenzies</h1>
      <p className="game-direction">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die">
        {diceElements}
      </div>
      <button 
        className="dice-status"
        onClick={rollDice} >{tenzies ? "New Game" : "Roll"}</button>
        <div className="dice-roll">Number of Rolls: <span className="roll-number">{diceRoll}</span></div>
    </main>
  )
}

export default App;
