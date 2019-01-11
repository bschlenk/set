/*
# The main function that prints
# all combinations of size r in
# arr[] of size n. This function
# mainly uses combinationUtil()
*/

export function combinations<T>(arr: T[], r: number) {
  const combinations: T[][] = [];

  const n = arr.length;

  // a temporary array to  store all combination
  // one by one.
  const data: T[] = [];

  const combinationUtil = (
    arr: T[],
    data: T[],
    start: number,
    end: number,
    index: number,
    r: number,
  ) => {
    // Current combination is ready
    // to be printed, print it
    if (index === r) {
      combinations.push([...data]);
      return;
    }

    /*
     * replace index with all
     * possible elements. The
     * condition "end-i+1 >=
     * r-index" makes sure that
     * including one element at
     * index will make a combination
     * with remaining elements at
     * remaining positions
     */
    let i = start;
    while (i <= end && end - i + 1 >= r - index) {
      data[index] = arr[i];
      combinationUtil(arr, data, i + 1, end, index + 1, r);
      ++i;
    }
  };

  // Print all combination
  // using temprary array 'data[]'
  combinationUtil(arr, data, 0, n - 1, 0, r);

  return combinations;
}
