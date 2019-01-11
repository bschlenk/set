import { Deck } from '../deck';

describe('deck', () => {
  let deck: Deck;
  beforeEach(() => {
    deck = new Deck();
  });

  describe('#constructor()', () => {
    it('creates a deck of cards with the expected size', () => {
      expect(deck.size()).toEqual(Math.pow(3, 4));
    });
  });

  describe('#draw()', () => {
    it('should take cards from the deck', () => {
      let size = deck.size();
      const card1 = deck.draw()[0];
      expect(deck.size()).toEqual(size - 1);
      size -= 1;
      const cards = deck.draw(4);
      expect(deck.size()).toEqual(size - 4);
      cards.push(card1);
      for (let i = 0; i < cards.length - 1; ++i) {
        expect(cards[0]).not.toEqual(cards[1]);
      }
    });

    it('should return the number of requested cards', () => {
      let size = deck.size();
      let cards = deck.draw(2);

      expect(cards.length).toEqual(2);
      expect(deck.size()).toEqual(size - 2);

      size = deck.size();
      cards = deck.draw(5);

      expect(cards.length).toEqual(5);
      expect(deck.size()).toEqual(size - 5);
    });

    it('should throw if no cards are left', () => {
      const size = deck.size() + 1;
      expect(() => {
        for (let i = 0; i < size; ++i) {
          deck.draw();
        }
      }).toThrow(/smaller/);
    });
  });

  describe('#drawOne()', () => {
    it('should draw a single card', () => {
      const size = deck.size();
      const card = deck.drawOne();
      const card2 = deck.drawOne();
      expect(size).toEqual(deck.size() + 2);
      expect(card).not.toEqual(card2);
    });
  });

  describe('#shuffle()', () => {
    it('should randomly order the deck', () => {
      const deck1 = new Deck();
      const deck2 = new Deck();

      deck1.shuffle();
      deck2.shuffle();

      const cards1 = deck1.draw(5);
      const cards2 = deck2.draw(5);

      expect(cards1).not.toEqual(cards2);
    });
  });
});
