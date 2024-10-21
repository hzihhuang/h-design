import { RefObject, useEffect } from 'react';

const MutationObserverMap = new WeakMap();

let mObserver: MutationObserver;

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

  useEffect(() => {
    // 判断 target 是否有值
    if (!!(target as RefObject<T>).current) {
      currentTarget = (target as RefObject<T>).current as T;
    } else if (target instanceof Element) {
      currentTarget = target as T;
    } else {
      return;
    }

    if (!mObserver) {
      mObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          const targetCallback = MutationObserverMap.get(mutation.target);
          if (targetCallback) {
            targetCallback(mutation, mObserver);
          }
        });
      });
    }

    MutationObserverMap.set(currentTarget, callback);
    mObserver.observe(currentTarget, options);

    return () => {
      if (!currentTarget) return;
      MutationObserverMap.delete(currentTarget);
      mObserver.disconnect();
    };
  }, [callback, options, target]);

  return () => {
    if (!currentTarget) return;
    MutationObserverMap.delete(currentTarget);
    mObserver.disconnect();
  };
}

export default useMutation;
