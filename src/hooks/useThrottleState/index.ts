import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

/**
 * @param value 状态初始值
 * @param delay 节流时间
 * @returns [start, setDebouncedState, setStart]
 * @description 带节流的功能 useState
 */
function useThrottleState<T>(value: T, delay: number): [T, Dispatch<SetStateAction<T>>, Dispatch<SetStateAction<T>>] {
  const timer = useRef<NodeJS.Timeout>();
  const [throttledValue, setThrottledValue] = useState<T>(value);

  const handlerChangeState: Dispatch<SetStateAction<T>> = useCallback(
    (v) => {
      if (timer.current) return;
      timer.current = setTimeout(() => {
        clearTimeout(timer.current);
        timer.current = void 0;
        setThrottledValue((v2) =>
          // @ts-ignore
          typeof v === 'function' ? v(v2) : v,
        );
      }, delay);
    },
    [delay, value],
  );

  const immediatelyChangeState: Dispatch<SetStateAction<T>> = useCallback(
    (v) => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = void 0;
      }
      // @ts-ignore
      setThrottledValue((v2) => (typeof v === 'function' ? v(v2) : v));
    },
    [value],
  );

  return [throttledValue, handlerChangeState, immediatelyChangeState];
}

export default useThrottleState;
