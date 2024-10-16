import { RefObject, useEffect } from 'react';

/** 当前监听 元素 以及它的 callback */
const resizeElementArr = new WeakMap();

/** 单例模式，整个项目只能存在一个 */
let rObserver: ResizeObserver;

export type ResizeCallback = (e: ResizeObserverEntry, observer: ResizeObserver) => void;
export type ResizeObserverOptions = {
  /** 是否使用动画帧计算 */
  needRequestAnimationFrame?: boolean;
};

/**
 * @description 订阅元素尺寸变化
 * @param callback (e: ResizeObserverEntry) => void
 * @param target Element
 * @param options ResizeObserverOptions
 * @returns () => void（取消订阅）
 */
function useResize<T extends Element>(
  callback: ResizeCallback,
  target: T | RefObject<T | undefined>,
  options?: ResizeObserverOptions,
) {
  const { needRequestAnimationFrame = true } = options ?? {};
  let currentTarget: T | null | undefined;
  useEffect(() => {
    currentTarget = (target as RefObject<T>).current ? (target as RefObject<T>).current : (target as T);
    if (!currentTarget) return;
    if (!rObserver) {
      rObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const isRequestAnimationFrame = !!(needRequestAnimationFrame && requestAnimationFrame);
          if (isRequestAnimationFrame) {
            requestAnimationFrame(() => resizeElementArr.get(entry.target)(entry, rObserver));
          } else {
            resizeElementArr.get(entry.target)(entry, rObserver);
          }
        });
      });
    }
    resizeElementArr.set(currentTarget, callback);
    rObserver.observe(currentTarget);

    return () => {
      if (!currentTarget) return;
      resizeElementArr.delete(currentTarget);
      rObserver.unobserve(currentTarget);
    };
  }, [callback, options]);

  return () => {
    if (!currentTarget) return;
    resizeElementArr.delete(currentTarget);
    rObserver.unobserve(currentTarget);
  };
}

export default useResize;
