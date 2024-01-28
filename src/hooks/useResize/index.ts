import { RefObject, useEffect } from 'react';

/** 当前监听 元素 以及它的 callback */
const resizeElementArr = new WeakMap();

/** 单例模式，整个项目只能存在一个 */
let rObserver: ResizeObserver;

type callbackType = (e: ResizeObserverEntry, observer: ResizeObserver) => void;

/**
 * @description 订阅元素尺寸变化
 * @param callback (e: ResizeObserverEntry) => void
 * @param target Element
 * @returns () => void（取消订阅）
 */
function useResize(
  callback: callbackType,
  target: Element | RefObject<Element | undefined>,
): () => void {
  let currentTarget: Element | null | undefined;
  useEffect(() => {
    currentTarget = (target as RefObject<Element>).current
      ? (target as RefObject<Element>).current
      : (target as Element);
    if (!currentTarget) return;
    if (!rObserver) {
      rObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          (resizeElementArr.get(entry.target) as callbackType)?.(
            entry,
            rObserver,
          );
        });
      });
    }
    resizeElementArr.set(currentTarget, callback);
    rObserver.observe(currentTarget);
  }, []);

  return () => {
    if (!currentTarget) return;
    resizeElementArr.delete(currentTarget);
    rObserver.unobserve(currentTarget);
  };
}

export default useResize;
