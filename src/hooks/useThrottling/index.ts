import { DependencyList, useCallback, useEffect, useRef } from 'react';

const DEFAULT_DEPS: DependencyList = [];
function useThrottling<T>(fn: T, delay: number, deps = DEFAULT_DEPS) {
  const { current } = useRef<any>({ fn, timer: null });
  useEffect(() => {
    current.fn = fn;
  }, [fn]);
  const callback = useCallback<T>((...args: any) => {
    if (current.timer) return;
    current.timer = setTimeout(() => {
      clearTimeout(current.timer);
      current.timer = null;
      current.fn(...args);
    }, delay);
  }, deps);

  return callback;
}

export default useThrottling;
