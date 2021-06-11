import { Card } from '../model/card';
import { Shape, Color, Count, Shade } from '../model/attributes';

type Deck = Card[];

/**
 * Create a new, shuffled Deck.
 */
export function createDeck(): Deck {
  const deck = freshDeck();
  return shuffle(deck);
}

function freshDeck() {
  const cards: Deck = [];
  for (let shape of Object.values(Shape)) {
    for (let color of Object.values(Color)) {
      for (let count of Object.values(Count)) {
        for (let shade of Object.values(Shade)) {
          cards.push(new Card(shape, color, count, shade));
        }
      }
    }
  }
  return cards;
}

/**
 * Shuffle the given deck, returning a shuffled copy.
 */
function shuffle(deck: Deck): Deck {
  deck = [...deck];
  const newDeck: Deck = [];

  while (deck.length) {
    const idx = Math.floor(Math.random() * deck.length);
    newDeck.push(deck.splice(idx, 1)[0]);
  }

  return newDeck;
}
