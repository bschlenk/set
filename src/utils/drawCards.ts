/**
 * Draw the given number of cards from the deck, returning
 * the drawn cards and the new deck with the drawn cards removed.
 * @param deck The deck to draw from.
 * @param numCards The number of cards to draw.
 * @return A tuple of drawn cards, new deck.
 */
export const drawCards = <T>(deck: T[], numCards: number) => {
  const drawn = deck.slice(0, numCards);
  const newDeck = deck.slice(numCards);
  return [drawn, newDeck];
};
