import { useState, useCallback } from 'react';

export function useArray<T>(initial: T[] | (() => T[])) {
  const [value, setValue] = useState(initial);

  const push = useCallback(a => setValue(v => [...v, a]), []);
  const clear = useCallback(() => setValue([]), []);
  const removeIndex = useCallback(
    index =>
      setValue(v => {
        v.splice(index, 1);
        return v;
      }),
    [],
  );
  const remove = useCallback((val: T) => {
    setValue(prevVal => prevVal.filter(prev => prev !== val));
  }, []);

  return {
    value,
    setValue,
    push,
    clear,
    remove,
    removeIndex,
  };
}
