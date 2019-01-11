import React from 'react';
import { Board } from './components/Board';
import { Button } from './components/Button';
import { useAppState, Mode } from './hooks/useAppState';
import { Card } from './model/card';
import './App.css';

const instructions = (
  <a href="http://www.setgame.com/sites/default/files/instructions/SET%20INSTRUCTIONS%20-%20ENGLISH.pdf">
    Instructions
  </a>
);

export function App() {
  const appState = useAppState();
  const cards = appState.state.deck.value.slice(0, 12);

  const handleSet = () => {
    appState.startChoosing();
  };

  const handleClick = (card: Card) => {
    if (appState.state.mode === Mode.CHOOSING) {
      if (appState.state.chosen.value.includes(card)) {
        appState.removeCard(card);
      } else {
        appState.addCard(card);
      }
    }
  };

  return (
    <div className="App">
      <Board
        cards={cards}
        selected={appState.state.chosen.value}
        onClick={handleClick}
      />
      {appState.state.mode === Mode.CHOOSING ? (
        <Button disabled>Click the cards!</Button>
      ) : (
        <Button onClick={handleSet}>Set!</Button>
      )}
    </div>
  );
}
