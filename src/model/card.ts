import { Shape, Color, Count, Shade } from './attributes';

/**
 * The representation of a set card.
 */
export class Card {
  constructor(
    public readonly shape: Shape,
    public readonly color: Color,
    public readonly count: Count,
    public readonly shade: Shade,
  ) {}

  toString() {
    return `Card[${this.shape} ${this.color} ${this.count} ${this.shade}]`;
  }

  /**
   * Retrieve all the attributes of this card as an array.
   */
  attributes() {
    return [this.shape, this.color, this.count, this.shade];
  }

  /**
   * Get a unique identifier for this card.
   */
  getId(): string {
    return this.attributes().join('#');
  }
}
