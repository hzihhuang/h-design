import { useLayoutEffect, useRef } from 'react';

/** 往上找距离最近的一个有Y轴滚动条的父元素 */
function findClosestScrollableElement(
  element: HTMLElement,
  direction: 'horizontal' | 'vertical' | 'both' = 'both',
) {
  let parent = element.parentElement;
  while (parent) {
    // 检查元素是否有滚动条
    if (direction === 'vertical' && parent.scrollHeight > parent.clientHeight)
      return parent;
    if (direction === 'horizontal' && parent.scrollWidth > parent.clientWidth)
      return parent;
    if (
      direction === 'both' &&
      (parent.scrollHeight > parent.clientHeight ||
        parent.scrollWidth > parent.clientWidth)
    )
      return parent;
    parent = parent.parentElement;
  }
  return document.body; // 如果没有找到有滚动条的父元素，则默认返回 body
}

interface UseStickyOptions {
  top?: number;
  left?: number;
  direction?: 'horizontal' | 'vertical' | 'both';
}

/**
 *
 * @description 很多情况下 position: sticky 无法生效
 * 比如父元素 overflow: hidden 或者父元素 position: fixed
 * 此时可以使用这个 hook 来实现
 */
function useSticky(options: UseStickyOptions) {
  const { top = 0, left = 0, direction = 'vertical' } = options;
  const stickyElement = useRef<HTMLDivElement>(null);
  const scrollElement = useRef<HTMLDivElement>(null);

  const translateX = useRef('0');
  const translateY = useRef('0');
  useLayoutEffect(() => {
    if (!stickyElement.current) return;
    const element =
      scrollElement.current ??
      findClosestScrollableElement(stickyElement.current, direction);
    const { top: parentTop, left: parentLeft } =
      element.getBoundingClientRect();
    const { top: childTop, left: childLeft } =
      stickyElement.current.getBoundingClientRect();
    const callback = () => {
      if (!stickyElement.current) return;
      const { scrollTop, scrollLeft } = element;
      const changeY = () =>
        (translateX.current =
          childTop - parentTop - scrollTop <= top
            ? `${-childTop + parentTop + scrollTop + top}px`
            : '0px');
      const changeX = () =>
        (translateY.current =
          childLeft - parentLeft - scrollLeft <= left
            ? `${-childLeft + parentLeft + scrollLeft + left}px`
            : '0px');
      switch (direction) {
        case 'vertical':
          changeY();
          break;
        case 'horizontal':
          changeX();
          break;
        case 'both': {
          changeY();
          changeX();
        }
      }
      stickyElement.current.style.transform = `translate(${translateY.current}, ${translateX.current})`;
    };
    const frameCallback = requestAnimationFrame
      ? () => requestAnimationFrame(callback)
      : callback;
    element.addEventListener('scroll', frameCallback);
    return () => element.removeEventListener('scroll', frameCallback);
  }, [top]);

  return { stickyElement, scrollElement };
}

export default useSticky;
