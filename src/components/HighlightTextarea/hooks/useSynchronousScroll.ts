import { useCallback } from 'react';

interface synchronousScrollOptions {
  /** 当前输入框 */
  currentTextAreaRef: React.RefObject<HTMLTextAreaElement>;
  /** 展示框 */
  boxRef: React.RefObject<HTMLDivElement>;
  /** 滚动条事件 */
  onScroll?: (e: React.UIEvent<HTMLTextAreaElement>) => void;
  /** 改变事件 */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
/** 同步滚动条 */
function useSynchronousScroll({
  currentTextAreaRef,
  boxRef,
  onScroll,
  onChange,
}: synchronousScrollOptions) {
  const unifiedScrollTop = useCallback(() => {
    if (!boxRef.current || !currentTextAreaRef.current) return;
    boxRef.current.scrollTop = currentTextAreaRef.current.scrollTop;
  }, []);
  const handlerScroll = useCallback(
    (e: React.UIEvent<HTMLTextAreaElement>) => {
      onScroll?.(e);
      unifiedScrollTop();
    },
    [onScroll],
  );
  const handlerChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
      unifiedScrollTop();
    },
    [onChange],
  );

  return {
    handlerScroll,
    handlerChange,
  };
}

export default useSynchronousScroll;
