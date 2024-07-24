import React, { CSSProperties, ReactNode, useMemo } from 'react';
import './index.scss';
import classNames from 'classnames';
import useMasonryResize from './hooks/useMasonryResize';
import useMasonryCards from './hooks/useMasonryCards';

export type MasonryOptions = {
  /** 列数 */
  column?: number;
  /**
   *  固定每一项的宽度
   *  itemMinWidth 和 itemMaxWidth 将失效
   */
  itemWidth?: number;
  /** 每一项的最小宽度 */
  itemMinWidth?: number;
  /** 每一项的最大宽度 */
  itemMaxWidth?: number;
  /** 间距 */
  gap?: number;
};
export interface MasonryProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** 配置项 */
  options?: MasonryOptions;
}

const Masonry: React.FC<MasonryProps> = ({
  className,
  style,
  options,
  children,
}) => {
  const {
    gap = 0,
    itemWidth,
    itemMinWidth = 300,
    itemMaxWidth = 400,
    column,
  } = options ?? {};
  const { currentItemMaxWidth, currentItemMinWidth } = useMemo(() => ({
    currentItemMaxWidth: itemWidth ?? itemMaxWidth,
    currentItemMinWidth: itemWidth ?? itemMinWidth,
  }), [itemWidth, itemMaxWidth, itemMinWidth]);
  /** 监听容器宽度变化 自适应 */
  const { containerRef, col } = useMasonryResize({
    currentItemMinWidth,
    gap,
    column,
  });

  const cards = useMasonryCards({
    gap,
    currentItemMaxWidth,
    currentItemMinWidth,
    children,
    col,
  })

  return (
    <div className={classNames('masonry', className)} style={style} ref={containerRef}>
      {cards}
    </div>
  );
};
export default Masonry;
