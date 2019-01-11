/**
 * Remove the given `element` from the `list`.
 * @param list
 * @param element
 * @return The element that was removed, or undefined if it wasn't in the list.
 */
export function range<T>(count: number, cb: (i: number) => T): T[] {
  const results: T[] = [];
  for (let i = 0; i < count; ++i) {
    results.push(cb(i));
  }
  return results;
}
