import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

/**
 * @param value 状态初始值
 * @param delay 防抖时间
 * @returns [start, setStart]
 * @description 带防抖的功能 useState
 */
function useDebounceState<T>(
  value: T,
  delay: number,
): [T, Dispatch<SetStateAction<T>>] {
  const timer = useRef<NodeJS.Timeout>();
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const handlerChangeState: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      // @ts-ignore
      timer.current = setTimeout(
        () =>
          setDebouncedValue((v) =>
            typeof value === 'function' ? value(v) : value,
          ),
        delay,
      );
    },
    [delay],
  );

  return [debouncedValue, handlerChangeState];
}

export default useDebounceState;
