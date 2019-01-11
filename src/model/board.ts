import { Card } from './card';
import { combinations } from '../utils/combinations';
import { isSet } from '../utils/isSet';

export class Board {
  private dirty: boolean = true;
  private readonly cards: Card[] = [];
  public readonly size: number;

  constructor(public readonly columns: number, public readonly rows: number) {
    this.size = columns * rows;
  }

  /**
   * Add either a single card or a list of cards.
   * @param cards
   * @return True if the board still has room.
   * @throws Error Thrown when the board is full.
   */
  add(cards: Card[] | Card) {
    if (this.cards.length === this.size) {
      throw new Error('Failed to add card - board is full!');
    }

    const cardArray = Array.isArray(cards) ? cards : [cards];

    console.log('adding %d cards to the board', cardArray.length);

    this.cards.push(...cardArray);
    this.dirty = true;

    return this.cards.length !== this.size;
  }

  /**
   * @return Whether the board still has room.
   */
  hasRoom(): boolean {
    return this.cards.length < this.size;
  }

  /**
   * Sets the card at the given location.
   */
  setCard(x: number, y: number, card: Card) {
    this.cards[y * this.columns + x] = card;
    this.dirty = true;
  }

  /**
   * Return the card at the given position.
   * @return The card at the given x,y position.
   */
  getCard(x: number, y: number): Card {
    return this.cards[y * this.columns + x];
  }

  findSets() {
    const potentialSets = combinations(this.cards, 3);
    return potentialSets.filter(isSet);
  }
}

/**
 * A card with an associated board position.
 */
export class PlacedCard {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly card: Card,
  ) {}

  /**
   * The unique id of this card.
   */
  getId() {
    return this.card.getId();
  }
}
