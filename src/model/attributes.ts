/**
 * Enums representing the possible attributes of
 * a set card.
 */

/**
 * The number of things displayed on a card.
 */
export enum Count {
  ONE = 'one',
  TWO = 'two',
  THREE = 'three',
}

/**
 * The color of the things displayed on a card.
 */
export enum Color {
  RED = 'red',
  GREEN = 'green',
  PURPLE = 'purple',
}

/**
 * The shading of the things displayed on a card.
 */
export enum Shade {
  NONE = 'none',
  STRIPED = 'striped',
  FILLED = 'filled',
}

/**
 * The shape of the things displayed on a card.
 */
export enum Shape {
  SQUIGGLE = 'squiggle',
  DIAMOND = 'diamond',
  OVAL = 'oval',
}

/**
 * A list of all the possible attributes.
 */
export const Attributes = [Shape, Color, Count, Shade];
