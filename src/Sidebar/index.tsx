import React, { CSSProperties, MutableRefObject, ReactNode, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import _ from 'lodash';
import './index.scss';

export type Props = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: CSSProperties;
  /** 
   * @description 挂载位置
   * @default document.body
   */
  target?: HTMLElement | MutableRefObject<HTMLElement>;
  /** 排列方向 */
  direction?: 'vertical' | 'horizontal';
  /** 对齐方向 */
  alignment?: 'start' | 'center' | 'end';
  /** 位置 */
  placement?: 'left' | 'top' | 'right' | 'bottom';
  /** 子元素配置 */
  itemOptions?: {
    gap?: number;
    width?: number;
    height?: number;
  };
  /** 偏移量 */
  offset?: {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
  }
  /** 层级 */
  zIndex?: Pick<CSSProperties, 'zIndex'>;
  children?: ReactNode;
};

const Sidebar: React.FC<Props> = ({
  className = '',
  style,
  target,
  direction = 'vertical',
  itemOptions,
  placement = 'right',
  alignment = 'end',
  offset,
  zIndex,
  children,
}) => {
  /** 挂载到哪里，默认 body */
  const [currentTarget, setCurrentTarget] = useState<HTMLElement>(document.body);
  useEffect(() => {
    if (_.isNil(target)) return;
    if (!!(target as any)?.current) return setCurrentTarget((target as MutableRefObject<HTMLElement>).current);
    setCurrentTarget(target as HTMLElement);
  }, [target]);

  /** sidebar层级，默认 10 */
  const zIndexMemo = useMemo(() => ({ [_.isNil(zIndex) ? '' : '--sidebar-zIndex']: zIndex }), [zIndex])

  /** 位置 */
  const positionMemo = useMemo(() => {
    const positionStyles: { [T: string]: any } = {};
    switch (placement) {
      case 'right': positionStyles['alignItems'] = 'end';
      case 'left': {
        positionStyles['height'] = '100%'
        positionStyles['width'] = '0px'
        positionStyles['flexDirection'] = 'column'
        switch (alignment) {
          case 'start': positionStyles['justifyContent'] = 'start'; break;
          case 'center': positionStyles['justifyContent'] = 'center'; break;
          case 'end': positionStyles['justifyContent'] = 'end'; break;
        }
        break;
      }
      case 'bottom': positionStyles['alignItems'] = 'end';
      case 'top': {
        positionStyles['width'] = '100%'
        positionStyles['height'] = '0px'
        switch (alignment) {
          case 'start': positionStyles['justifyContent'] = 'start'; break;
          case 'center': positionStyles['justifyContent'] = 'center'; break;
          case 'end': positionStyles['justifyContent'] = 'end'; break;
        }
      }
    }
    positionStyles[placement] = 0
    return positionStyles;
  }, [placement, alignment]);

  /** 最终的样式 */
  const sidebarStyle = useMemo(() => ({
    ...zIndexMemo,
    ...positionMemo,
    ...style
  }), [zIndexMemo, positionMemo, style])

  /** 排列方向, 默认 vertical(垂直) */
  const { width, height, gap } = itemOptions ?? {};
  const directionMemo = useMemo(() => ({
    [_.isNil(gap) ? '' : '--sidebar-item-gap']: `${gap}px`,
    [_.isNil(width) ? '' : '--sidebar-item-width']: `${width}px`,
    [_.isNil(height) ? '' : '--sidebar-item-height']: `${height}px`,
  }), [gap, width, height])

  /** 偏移量 */
  const translate = useMemo(() => {
    if (!offset) return {};
    const { top, left, bottom, right } = offset;
    return { transform: `translate(${left ?? (right ? -right : 0)}px, ${top ?? (bottom ? -bottom : 0)}px)` }
  }, [offset])

  return createPortal(
    <div className={`sidebar ${className}`} style={sidebarStyle}>
      <div className={`sidebar-${direction}`} style={{...directionMemo, ...translate}}>
        {children}
      </div>
    </div>,
    currentTarget,
  );
};

export default Sidebar;
