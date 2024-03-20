import {} from 'lodash-es';
import { useCallback } from 'react';

interface CurosrOptions {
  /** 编辑器 */
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  elementList: { type: string; msg: string }[];
}
// 处理关于光标的逻辑
function useCursor({ value, textareaRef, elementList }: CurosrOptions) {
  // 点击容器时，让光标聚焦在 textarea 最后
  const handlerContainerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === e.currentTarget && textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(value.length, value.length);
      }
    },
    [value],
  );

  // 点击 box 时，把光标位置同步到 textarea 上，因为 textarea 有样式 pointer-event:none
  const handlerBoxClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const selection = window.getSelection();
      const childrens = [...(e.currentTarget.children as any)];
      // 当前点击哪个 span 的下标
      const currentIdx = childrens.findIndex((item) => item === e.target);
      // 获取到当前点击 span 之前所有 span 内字符串长度之和
      const currentLength = elementList
        .filter(
          (_i, idx) =>
            idx < (currentIdx > -1 ? currentIdx : elementList.length - 1),
        )
        .reduce((p, c) => p + c.msg.length, 0);

      if (selection && selection.rangeCount > 0 && textareaRef.current) {
        const range = selection.getRangeAt(0);
        // 获取选区的开始和结束位置
        const start = range.startOffset + currentLength;
        const end = range.endOffset + currentLength;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start, end);
      }
    },
    [elementList],
  );
  return {
    handlerContainerClick,
    handlerBoxClick,
  };
}

export default useCursor;
