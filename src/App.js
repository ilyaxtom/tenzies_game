import React from 'react';
import Die from './Die';
import {nanoid} from "nanoid";
import Confetti from 'react-confetti'

function App() {
  const [numbers, setNumbers] = React.useState( allNewDice() );
  const [tenzies, setTenzies] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [bestScore, setBestScore] = React.useState( localStorage.getItem("bestScore") );

  React.useEffect(() => {
    const allHeld = numbers.every(item => item.isHeld === true);
    const sameValue = numbers.every(item => item.value === numbers[0].value);

    if (sameValue && allHeld) {
      setTenzies(true);
    }
  }, [numbers]);

  const diceElements = numbers.map( item => (
    <Die
      key={item.id}
      value={item.value}
      isHeld={item.isHeld}
      holdDice={() => hold(item.id)}
    />
  ));

  function createNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push( createNewDice() );
    }
    return newDice;
  }

  function hold(id) {
    setNumbers(prev => prev.map( item => {
      if (item.id === id) {
        return {
          ...item,
          isHeld: !prev.isHeld,
        };
      } else return item;
    }));
  }

  function changeNumbers() {
    if (!tenzies) {
      setNumbers( prev => prev.map( item => {
        if (item.isHeld) return item
        else return createNewDice();
      }));
      setScore(prev => ++prev);
    } else {
      setTenzies(false);
      setNumbers( allNewDice() );

      setBestScore( bestScore === null ? score :
          score < bestScore ? score :
          bestScore
      );
      localStorage.setItem("bestScore", JSON.stringify(bestScore));
      setScore(0);
    }
  }

  return (
    <main className="Game">
      {tenzies && <Confetti/>}
      <div className="counter">
        <span className="score">Score: {score}</span>
        <span className="best-score">Best score: {bestScore}</span>
      </div>
      <div className="text">
        <h1 className="title">Tenzies</h1>
        <div className="description">
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </div>
      </div>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-btn" onClick={changeNumbers}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;