import React, { useState } from 'react';
import { ReactComponent as CardIcon } from './images/cards.svg';
import { Board } from './components/Board';
import { Button } from './components/Button';
import { Card } from './model/card';
import { useSetMachine } from './state/useSetMachine';
import { TimerButton } from './components/TimerButton';
import './App.scss';

const instructions = (
  <a href="http://www.setgame.com/sites/default/files/instructions/SET%20INSTRUCTIONS%20-%20ENGLISH.pdf">
    Instructions
  </a>
);

export function App() {
  const machine = useSetMachine();
  const [addCardsCooldown, setAddCardsCooldown] = useState(false);

  const { board, declaredCards, sets, countdown } = machine.context;
  const declaring = machine.state.matches('game.declaring');

  const handleDeclare = () => machine.send('DECLARE');

  const handleClick = (card: Card) => {
    if (declaring) {
      if (declaredCards.includes(card)) {
        machine.send({ type: 'REMOVE_CARD', card });
      } else {
        machine.send({ type: 'ADD_CARD', card });
      }
    }
  };

  const addCards = () => {
    machine.send({ type: 'NO_SETS' });
    setAddCardsCooldown(true);
    setTimeout(() => {
      setAddCardsCooldown(false);
    }, 3000);
  };

  return (
    <div className="App">
      <Board cards={board} selected={declaredCards} onClick={handleClick} />
      <div className="Controls">
        {declaring ? (
          <TimerButton disabled time={countdown}>
            Click the cards!
          </TimerButton>
        ) : (
          <>
            <Button onClick={handleDeclare}>Set!</Button>
            <Button
              title="Add 3 more cards"
              onClick={addCards}
              disabled={addCardsCooldown}
            >
              <CardIcon />
            </Button>
          </>
        )}
      </div>
      <span>Score: {sets.length}</span>
    </div>
  );
}
