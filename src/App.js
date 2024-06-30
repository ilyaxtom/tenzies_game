import React from 'react';
import Die from './Die';
import {nanoid} from "nanoid";
import Confetti from 'react-confetti'

function App() {
  const [numbers, setNumbers] = React.useState( allNewDice() );

  const [tenzies, setTenzies] = React.useState(false);

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

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
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
        else {
          return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
          }
        }
      }));
    } else {
      setTenzies(false);
      setNumbers(allNewDice());
    }
  }

  return (
    <main className="Game">
      {tenzies && <Confetti/>}
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