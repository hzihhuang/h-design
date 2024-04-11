import { ReactNode, useCallback, useEffect, useState } from 'react';

function useHasScroll({
  children,
  containerRef,
}: {
  children: ReactNode;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  // 检测是否有滚动条
  const [hasScroll, setHasScroll] = useState({
    hasX: false,
    hasY: false,
  });
  // 检测元素是否出现滚动条
  const handlerTestHasScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollHeight, clientHeight, scrollWidth, clientWidth } =
      containerRef.current;
    const hasX = scrollWidth > clientWidth;
    const hasY = scrollHeight > clientHeight;
    setHasScroll({
      hasX,
      hasY,
    });
  }, []);

  // 容器是否改变大小重新检测
  useEffect(() => {
    if (!containerRef.current) return;
    handlerTestHasScroll();
    const observer = new ResizeObserver((entrys) =>
      entrys.forEach(() => handlerTestHasScroll()),
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [children]);

  return {
    hasScroll,
  };
}

export default useHasScroll;
