import { RefObject, useEffect } from 'react';

const attributeObserverMap = new WeakMap();

let mObserver: MutationObserver;

export type AttributeChangeCallback = (mutation: MutationRecord, observer: MutationObserver) => void;

export type AttributeObserverOptions = {
  /** 是否监听，默认 true */
  attributes?: boolean;
  /** 监听属性，不填默认全部属性 */
  attributeFilter?: string[];
  /** 旧值 */
  attributeOldValue?: boolean;
};

/**
 * @description 订阅元素属性变化
 * @param callback (mutations: MutationRecord[], observer: MutationObserver) => void
 * @param target Element | RefObject<Element>
 * @param options AttributeObserverOptions
 * @returns () => void（取消订阅）
 */
function useAttributeChange<T extends Element>(
  callback: AttributeChangeCallback,
  target: T | RefObject<T | undefined>,
  options?: AttributeObserverOptions,
) {
  let currentTarget: T | null = null;

  useEffect(() => {
    currentTarget = (target as RefObject<T>).current ?? (target as T);
    if (!currentTarget) return;

    if (!mObserver) {
      mObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          const targetCallback = attributeObserverMap.get(mutation.target);
          if (targetCallback) {
            targetCallback(mutation, mObserver);
          }
        });
      });
    }

    attributeObserverMap.set(currentTarget, callback);
    mObserver.observe(currentTarget, {
      attributes: options?.attributes ?? true,
      attributeFilter: options?.attributeFilter,
      attributeOldValue: options?.attributeOldValue ?? false,
    });

    return () => {
      if (!currentTarget) return;
      attributeObserverMap.delete(currentTarget);
      mObserver.disconnect();
    };
  }, [callback, options, target]);

  return () => {
    if (!currentTarget) return;
    attributeObserverMap.delete(currentTarget);
    mObserver.disconnect();
  };
}

export default useAttributeChange;
