import { RefObject, useEffect, useRef } from 'react';

export type MutationCallback = (mutation: MutationRecord, observer: MutationObserver) => void;

/**
 * @description 订阅元素变化
 * @param callback (mutations: MutationRecord[], observer: MutationObserver) => void
 * @param target Element | RefObject<Element>
 * @param options MutationObserverInit
 * @returns () => void（取消订阅）
 */
function useMutation<T extends Element>(
  callback: MutationCallback,
  target: T | RefObject<T | undefined>,
  options?: MutationObserverInit,
) {
  let currentTarget: T;
  const mObserver = useRef<MutationObserver>();
  useEffect(() => {
    // 判断 target 是否有值
    if (!!(target as RefObject<T>).current) {
      currentTarget = (target as RefObject<T>).current as T;
    } else if (target instanceof Element) {
      currentTarget = target as T;
    } else {
      return;
    }
    mObserver.current = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        callback(mutation, mObserver.current as MutationObserver);
      });
    });
    mObserver.current.observe(currentTarget, options);
    return () => {
      if (!currentTarget) return;
      mObserver.current?.disconnect();
    };
  }, [callback, options, target]);

  return () => {
    if (!currentTarget || !mObserver) return;
    mObserver.current?.disconnect();
  };
}

export default useMutation;
