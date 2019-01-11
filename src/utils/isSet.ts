import { Card } from '../model/card';

/**
 * Return whether this is a valid set. A valid set is
 * one that conforms to the rules of set.
 * @return Whether this set is valid.
 */
export function isSet(cards: Card[]): boolean {
  if (cards.length !== 3) {
    return false;
  }
  const attributes = zip(cards.map(card => card.attributes()));
  return attributes.every(allSameOrAllDifferent);
}

function allSameOrAllDifferent(values: any[]): boolean {
  const uniqueCount = new Set(values).size;
  return uniqueCount === 1 || uniqueCount === values.length;
}

/**
 * Zip all the arrays together, like python's zip method.
 * Assumes all the arrays are of the same size.
 * @param values The values to zip.
 */
function zip<T>(values: T[][]): T[][] {
  const length = values[0].length;
  const zipped = [];
  for (let i = 0; i < length; ++i) {
    const row = values.map(v => v[i]);
    zipped.push(row);
  }
  return zipped;
}
