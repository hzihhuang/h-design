import { ResizeCallback, useResize } from 'HDesign';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { MasonryOptions } from '../index';

type MasonryResizeType = {
  currentItemMinWidth: number;
  gap: number;
} & Pick<MasonryOptions, 'column'>;

function useMasonryResize({ currentItemMinWidth, gap, column }: MasonryResizeType) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [newCol, setNewCol] = useState<number>(1); // 计算后当前容器最大能装多少列
  const col = useMemo(() => (column ? column : newCol), [column, newCol]); // 最终使用多少列

  const handleChangeCol = useDebounce(
    (col: number) => {
      setNewCol(col);
    },
    0,
    [],
  );

  const resizeCallback: ResizeCallback = useCallback(
    (item) => handleChangeCol(Math.floor(item.contentRect.width / (currentItemMinWidth + gap))),
    [currentItemMinWidth, gap, handleChangeCol],
  );
  const disconnect = useResize(resizeCallback, containerRef);
  useEffect(() => () => disconnect(), []);
  return {
    containerRef,
    /** 当前列数 */
    col,
  };
}

export default useMasonryResize;
