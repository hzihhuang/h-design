import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

/**
 * @param value 状态初始值
 * @param delay 节流时间
 * @returns [start, setStart]
 * @description 带节流的功能 useState
 */
function useThrottlingState<T>(
  value: T,
  delay: number,
): [T, Dispatch<SetStateAction<T>>] {
  const timer = useRef<NodeJS.Timeout>();
  const [throttledValue, setThrottledValue] = useState<T>(value);

  const handlerChangeState: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      if (timer.current) return;
      timer.current = setTimeout(() => {
        clearTimeout(timer.current);
        timer.current = undefined;
        setThrottledValue((v) =>
          // @ts-ignore
          typeof value === 'function' ? value(v) : value,
        );
      }, delay);
    },
    [delay],
  );
  return [throttledValue, handlerChangeState];
}

export default useThrottlingState;
