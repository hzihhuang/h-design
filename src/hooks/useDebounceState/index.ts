import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

/**
 * @param value 状态初始值
 * @param delay 防抖时间
 * @returns [start, setDebouncedState, setStart]
 * @description 带防抖的功能 useState
 */
function useDebounceState<T>(
  value: T,
  delay: number,
): [T, Dispatch<SetStateAction<T>>, Dispatch<SetStateAction<T>>] {
  const timer = useRef<NodeJS.Timeout>();
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const handlerChangeState: Dispatch<SetStateAction<T>> = useCallback(
    (v) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(
        // @ts-ignore
        () =>
          setDebouncedValue((v2) => (typeof v === 'function' ? v(v2) : value)),
        delay,
      );
    },
    [delay, value],
  );

  const immediatelyChangeState: Dispatch<SetStateAction<T>> = useCallback(
    (v) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      // @ts-ignore
      setDebouncedValue((v2) => (typeof v === 'function' ? v(v2) : value));
    },
    [value],
  );

  return [debouncedValue, handlerChangeState, immediatelyChangeState];
}

export default useDebounceState;
