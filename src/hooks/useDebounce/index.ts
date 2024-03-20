import { DependencyList, useCallback, useEffect, useRef } from 'react';

const DEFAULT_DEPS: DependencyList = [];
function useDebounce<T>(fn: T, delay: number, deps = DEFAULT_DEPS) {
  const { current } = useRef<any>({ fn, timer: null });
  useEffect(() => {
    current.fn = fn;
  }, [fn]);
  const callback = useCallback<T>((...args: any) => {
    clearTimeout(current.timer);
    current.timer = setTimeout(() => {
      current.fn(...args);
    }, delay);
  }, deps);

  return callback;
}

export default useDebounce;
