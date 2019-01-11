import { Set } from '../set';
import { Card } from '../card';
import { Shape, Count, Color, Shade } from '../attributes';

describe('set', () => {
  describe('#constructor()', () => {
    it('should throw if not 3 cards are given', () => {
      const card1 = new Card(Shape.OVAL, Color.GREEN, Count.TWO, Shade.FILLED);
      const card2 = new Card(
        Shape.DIAMOND,
        Color.GREEN,
        Count.TWO,
        Shade.FILLED,
      );

      expect(() => new Set([card1, card2])).toThrow(/exactly 3/);
    });
  });

  describe('#isSet()', () => {
    it('should return true when all but one of the attributes are all the same', () => {
      const card1 = new Card(Shape.OVAL, Color.GREEN, Count.TWO, Shade.FILLED);
      const card2 = new Card(
        Shape.DIAMOND,
        Color.GREEN,
        Count.TWO,
        Shade.FILLED,
      );
      const card3 = new Card(
        Shape.SQUIGGLE,
        Color.GREEN,
        Count.TWO,
        Shade.FILLED,
      );

      const set = new Set([card1, card2, card3]);
      expect(set.isSet()).toBeTruthy();
    });

    it('should return false when one attribute has only two the same', () => {
      const card1 = new Card(Shape.OVAL, Color.GREEN, Count.TWO, Shade.FILLED);
      const card2 = new Card(
        Shape.DIAMOND,
        Color.GREEN,
        Count.TWO,
        Shade.FILLED,
      );
      const card3 = new Card(
        Shape.SQUIGGLE,
        Color.GREEN,
        Count.ONE,
        Shade.FILLED,
      );

      const set = new Set([card1, card2, card3]);
      expect(set.isSet()).toBeFalsy();
    });

    it('should return true when everything is different', () => {
      const card1 = new Card(Shape.OVAL, Color.GREEN, Count.ONE, Shade.FILLED);
      const card2 = new Card(
        Shape.DIAMOND,
        Color.PURPLE,
        Count.TWO,
        Shade.NONE,
      );
      const card3 = new Card(
        Shape.SQUIGGLE,
        Color.RED,
        Count.THREE,
        Shade.STRIPED,
      );

      const set = new Set([card1, card2, card3]);
      expect(set.isSet()).toBeTruthy();
    });
  });
});
