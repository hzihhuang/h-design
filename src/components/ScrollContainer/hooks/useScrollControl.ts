import { ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';

/** 实现自定义的滚动控制逻辑 */
function useScrollControl({
  children,
  containerRef,
  scrollThumbYRef,
  scrollThumbXRef,
  gap,
  size,
}: {
  children: ReactNode;
  containerRef: React.RefObject<HTMLDivElement>;
  scrollThumbYRef: React.RefObject<HTMLDivElement>;
  scrollThumbXRef: React.RefObject<HTMLDivElement>;
  gap: number;
  size: number;
}) {
  // 计算滚动条
  const isDragging = useRef(false); // 开始拖动
  const start = useRef({ X: 0, Y: 0 }); // 开始位置
  const maxThumbTop = useRef(0);
  const maxThumbLeft = useRef(0);
  const curControl = useRef<'X' | 'Y' | null>(null);
  /** 这个尺寸是滚动条滚动到最后距离边框的距离 */
  const thumbEnd = useMemo(() => gap + size, [gap, size]);
  /** 滚动条距离开始距离边框的距离 */
  const thumbStart = useRef(4);

  /** 鼠标滚动的时候同步滚动条 */
  const handlerScroll = useCallback(() => {
    if (
      !containerRef.current ||
      !scrollThumbYRef.current ||
      !scrollThumbXRef.current
    )
      return;
    const {
      scrollTop,
      scrollLeft,
      clientHeight,
      clientWidth,
      scrollHeight,
      scrollWidth,
    } = containerRef.current;
    const maxThumbScrollHeight = scrollHeight - clientHeight; // 滚动条可滚动高度
    const maxThumbScrollWidth = scrollWidth - clientWidth; // 滚动条可滚动宽度
    const thumbTop = (scrollTop / maxThumbScrollHeight) * maxThumbTop.current;
    const thumbLeft = (scrollLeft / maxThumbScrollWidth) * maxThumbLeft.current;
    scrollThumbYRef.current.style.top = `${Math.min(
      Math.max(thumbTop, thumbStart.current),
      maxThumbTop.current,
    )}px`;
    scrollThumbXRef.current.style.left = `${Math.min(
      Math.max(thumbLeft, thumbStart.current),
      maxThumbLeft.current,
    )}px`;
  }, []);
  useEffect(() => {
    if (
      !containerRef.current ||
      !scrollThumbYRef.current ||
      !scrollThumbXRef.current
    )
      return;
    const { offsetHeight, offsetWidth, scrollHeight, scrollWidth } =
      containerRef.current;
    const thumbHeight = offsetHeight * (offsetHeight / scrollHeight); // Y 滑块的高度;
    const thumbWidth = offsetWidth * (offsetWidth / scrollWidth); // X 滑块的高度;
    maxThumbTop.current = offsetHeight - thumbHeight - thumbEnd; // Y 距离顶部最大距离
    maxThumbLeft.current = offsetWidth - thumbWidth - thumbEnd; // X 距离左侧最大距离
    scrollThumbXRef.current.style.width = `${thumbWidth}px`; // 设置 X 滚动条
    scrollThumbYRef.current.style.height = `${thumbHeight}px`; // 设置 Y 滚动条
    handlerScroll(); // 重置滚动条
  }, [children, thumbEnd]);

  const onThumbMouseMove = (e: MouseEvent) => {
    if (isDragging.current && containerRef.current) {
      const { clientHeight, clientWidth, scrollHeight, scrollWidth } =
        containerRef.current;
      const maxThumbScrollHeight = scrollHeight - clientHeight; // 滚动条可滚动高度
      const maxThumbScrollWidth = scrollWidth - clientWidth; // 滚动条可滚动宽度
      e.preventDefault();
      if (curControl.current === 'Y') {
        const thumbTop = e.pageY - start.current.Y;
        const scrollTop =
          (thumbTop / maxThumbTop.current) * maxThumbScrollHeight;
        console.log(scrollTop);
        containerRef.current.scrollTop = scrollTop;
      } else if (curControl.current === 'X') {
        const thumbLeft = e.pageX - start.current.X;
        const scrollLeft =
          (thumbLeft / maxThumbLeft.current) * maxThumbScrollWidth;
        containerRef.current.scrollLeft = scrollLeft;
      }
    }
  };
  const onThumbMouseUp = () => {
    isDragging.current = false;
    curControl.current = null;
    scrollThumbYRef.current?.classList.remove('active');
    scrollThumbXRef.current?.classList.remove('active');
    document.removeEventListener('mousemove', onThumbMouseMove);
    document.removeEventListener('mouseup', onThumbMouseUp);
  };
  // 关于拖动滚动条
  const onThumbMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!scrollThumbYRef.current || !scrollThumbXRef.current) return;
    e.preventDefault();
    isDragging.current = true;
    start.current = {
      X: e.pageX - scrollThumbXRef.current.offsetLeft,
      Y: e.pageY - scrollThumbYRef.current.offsetTop,
    };
    document.addEventListener('mousemove', onThumbMouseMove);
    document.addEventListener('mouseup', onThumbMouseUp);
  };
  const onThumbY = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      curControl.current = 'Y';
      scrollThumbYRef.current?.classList.add('active');
      onThumbMouseDown(e);
    },
    [onThumbMouseDown],
  );
  const onThumbX = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      curControl.current = 'X';
      scrollThumbXRef.current?.classList.add('active');
      onThumbMouseDown(e);
    },
    [onThumbMouseDown],
  );

  return {
    scrollThumbX: scrollThumbXRef,
    scrollThumbY: scrollThumbYRef,
    onThumbX,
    onThumbY,
    handlerScroll,
  };
}

export default useScrollControl;
