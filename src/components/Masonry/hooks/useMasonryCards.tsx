import React, { useMemo } from "react";
import { MasonryProps } from "../index";

type useMasonryCardsType = {
  currentItemMinWidth: number;
  currentItemMaxWidth: number;
  col: number;
  gap: number;
} & Pick<MasonryProps, 'children'>

function useMasonryCards({
  gap,
  col,
  currentItemMinWidth,
  currentItemMaxWidth,
  children,
}: useMasonryCardsType) {
  const child = useMemo(() => (children instanceof Array ? children : [children]), [children]);
  const colChilds = useMemo(() => {
    const colHeightArray = Array.from({ length: col }).map(() => 0); // 每一列的高度集合
    const colArray: any = Array.from({ length: col }).map(() => []); // 遍历后的元素

    child.forEach((item) => {
      // 遍历判断每个元素存放在哪一列
      let ratio = item?.props?.ratio;
      if (typeof ratio === 'string') {
        // eslint-disable-next-line
        ratio = eval(ratio);
      }
      const minHeight = Math.min(...colHeightArray);
      const currentMinIdx = colHeightArray.findIndex(i => i === minHeight);
      colHeightArray[currentMinIdx] = colHeightArray[currentMinIdx] + 1 / (ratio ?? 1);
      colArray[currentMinIdx]?.push?.(item);
    });
    return colArray;
  }, [child, col]);

  return (
    <div className='flex' style={{ gap }}>
      {Array.from({ length: col }).map((_i, idx) => React.createElement('div', {
        className: 'flex',
        style: {
          gap,
          flexWrap: 'nowrap',
          flexShrink: 0,
          flexDirection: 'column',
          width: `calc(${100 / col}% - ${((col - 1) * gap) / col}px)`,
          minWidth: currentItemMinWidth,
          maxWidth: currentItemMaxWidth,
        },
        key: idx,
        children: colChilds[idx],
      }))}
    </div>
  );
}
export default useMasonryCards;
