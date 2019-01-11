import { Card } from '../model/card';
import { Shape, Color, Count, Shade } from '../model/attributes';
import { range } from './range';

const NUM_SHUFFLES = 5;

type Deck = Card[];

/**
 * Create a new Deck. The deck is created in a deterministic
 * manner and will always create the same deck. Call shuffle
 * afterwards to shuffle the deck.
 */
export function createDeck(): Deck {
  const deck = freshDeck();
  range(NUM_SHUFFLES, () => shuffle(deck));
  return deck;
}

const freshDeck = () => {
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
};

/**
 * Shuffle the deck by swapping random cards.
 */
const shuffle = (deck: Deck) => {
  let currentIndex = deck.length;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    const temporaryValue = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temporaryValue;
  }
};
