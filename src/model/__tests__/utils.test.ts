import * as utils from '../utils';

describe('utils', () => {
  describe('#allSame()', () => {
    it('should return true when all the elements are the same', () => {
      expect(utils.allSame(['a', 'a', 'a', 'a', 'a'])).toBeTruthy();
    });

    it('should return false when some of the elements are different', () => {
      expect(utils.allSame([1, 1, 1, 2])).toBeFalsy();
    });
  });

  describe('#allDifferent()', () => {
    it('should return true if all the elements are different', () => {
      expect(utils.allDifferent([1, 2, 3, 4])).toBeTruthy();
    });

    it('should return false if some of the elements are the same', () => {
      expect(utils.allDifferent([1, 1, 2, 3, 4])).toBeFalsy();
    });

    it('should return false if all of the elements are the same', () => {
      expect(utils.allDifferent([1, 1, 1, 1, 1])).toBeFalsy();
    });
  });

  describe('#zip()', () => {
    it('should zip an array of arrays', () => {
      const input = [[1, 2, 3], [3, 3, 1], [1, 1, 2], [1, 3, 2]];

      const expected = [[1, 3, 1, 1], [2, 3, 1, 3], [3, 1, 2, 2]];

      const output = utils.zip(input);

      expect(output).toEqual(expected);
    });
  });
});
