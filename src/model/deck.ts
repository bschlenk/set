import { Card } from './card';
import { Shape, Color, Count, Shade } from './attributes';

/**
 * The representation of a deck of set cards.
 */
export class Deck {
  cards: Card[] = [];

  /**
   * Create a new Deck. The deck is created in a deterministic
   * manner and will always create the same deck. Call shuffle
   * afterwards to shuffle the deck.
   */
  constructor() {
    for (let shape of Object.values(Shape)) {
      for (let color of Object.values(Color)) {
        for (let count of Object.values(Count)) {
          for (let shade of Object.values(Shade)) {
            this.cards.push(new Card(shape, color, count, shade));
          }
        }
      }
    }
  }

  /**
   * The number of cards in the deck.
   */
  size() {
    return this.cards.length;
  }

  /**
   * Draws `count` cards from the deck.
   */
  draw(count = 1): Card[] {
    if (this.cards.length < count) {
      throw new Error(
        `Deck is smaller than requested count (${this.size()} < ${count})`,
      );
    }
    const drawn = this.cards.slice(0, count);
    this.cards = this.cards.slice(count);
    return drawn;
  }

  /**
   * Convenience method for drawing a single card.
   */
  drawOne(): Card {
    return this.draw()[0];
  }

  /**
   * Shuffle the deck by swapping random cards.
   */
  shuffle() {
    let currentIndex = this.size();

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      const temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }
  }
}
