/**
 * Get the size of an object.
 * @return The number of items in the object.
 */
export function objectSize(obj: number) {
  return Object.keys(obj).length;
}

/**
 * Remove the given `element` from the `list`.
 * @param list
 * @param element
 * @return The element that was removed, or undefined if it wasn't in the list.
 */
export function remove<T>(list: T[], element: T): T | undefined {
  const index = list.indexOf(element);
  if (index > -1) {
    return list.splice(index, 1)[0];
  }
  return undefined;
}
