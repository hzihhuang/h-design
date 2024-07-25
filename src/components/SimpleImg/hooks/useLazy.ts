import { useEffect } from 'react';

/** 往上找最近的一个有滚动条的父元素 */
function findClosestScrollableElement(element: Element) {
  let parent = element.parentElement;
  while (parent) {
    // 检查元素是否有滚动条
    if (parent.scrollHeight > parent.clientHeight || parent.scrollWidth > parent.clientWidth) return parent;
    parent = parent.parentElement;
  }
  return document; // 如果没有找到有滚动条的父元素，则返回整个文档
}

interface UseLazyEvent {
  imgRef: React.RefObject<HTMLImageElement>;
  src?: string;
}
/**
 * 图片懒加载功能
 * 当图片出现在页面上 src 上的值才会被放上去。
 */
function useLazy({ imgRef, src }: UseLazyEvent) {
  useEffect(() => {
    if (!imgRef.current || src === void 0) return;
    const callback: IntersectionObserverCallback = (e) => {
      e.forEach((i) => {
        if (i.isIntersecting) {
          imgRef.current?.setAttribute('src', src);
        }
      });
    };
    const root = findClosestScrollableElement(imgRef.current);
    const observer = new IntersectionObserver(callback, {
      root,
      threshold: [0],
    });
    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [src]);
}

export default useLazy;
