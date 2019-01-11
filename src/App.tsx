import React, { useEffect } from 'react';
import { Board } from './components/Board';
import { Button } from './components/Button';
import { Card } from './model/card';
import { useSetMachine } from './state/useSetMachine';
import './App.css';

const instructions = (
  <a href="http://www.setgame.com/sites/default/files/instructions/SET%20INSTRUCTIONS%20-%20ENGLISH.pdf">
    Instructions
  </a>
);

export function App() {
  const machine = useSetMachine();

  useEffect(() => {
    machine.service.start();
  }, []);

  const { board, declaredCards, sets } = machine.context;
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

  return (
    <div className="App">
      <Board cards={board} selected={declaredCards} onClick={handleClick} />
      {declaring ? (
        <Button disabled>Click the cards!</Button>
      ) : (
        <Button onClick={handleDeclare}>Set!</Button>
      )}
    </div>
  );
}
