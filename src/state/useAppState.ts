import { useState, useRef } from 'react';
import { Card } from '../model/card';
import { createDeck } from '../utils/createDeck';
import { useArray } from './useArray';
import { isSet } from '../utils/isSet';

const SECONDS_TO_CHOOSE = 3;

export enum Mode {
  IDLE,
  CHOOSING,
}

export function useAppState() {
  const [mode, setMode] = useState(Mode.IDLE);
  const [points, setPoints] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const deck = useArray(createDeck);
  const chosen = useArray<Card>([]);

  const timer = useRef(0);

  return {
    state: { mode, deck, chosen, points, countdown },
    startChoosing: () => {
      setMode(Mode.CHOOSING);
      setCountdown(SECONDS_TO_CHOOSE);
      timer.current = window.setInterval(() => {
        setCountdown(c => {
          const newCountdown = c - 1;
          if (newCountdown === 0) {
            clearInterval(timer.current);
            setPoints(p => (p === 0 ? p : p - 1));
            chosen.clear();
            setMode(Mode.IDLE);
          }
          return newCountdown;
        });
      }, 1000);
    },
    addCard: (card: Card) => {
      if (chosen.value.length + 1 === 3) {
        if (isSet([...chosen.value, card])) {
          console.log('That was a set!');
          setPoints(p => p + 1);
        } else {
          console.log('NOT A SET!');
          setPoints(p => (p === 0 ? p : p - 1));
        }
        chosen.clear();
        setMode(Mode.IDLE);
        clearInterval(timer.current);
      } else {
        chosen.push(card);
      }
    },
    removeCard: (card: Card) => chosen.remove(card),
  };
}

/**
 * deck: Card[];
 *
 * IDLE
 *   SET -> CHOOSING
 *
 * CHOOSING
 *   SELECT -> CHOOSING (append card)
 *     After 3 chosen
 *       If set:
 *         You get a point -> IDLE
 *         Remove & replace cards
 *       Else:
 *         Lose a point -> IDLE
 *
 */
