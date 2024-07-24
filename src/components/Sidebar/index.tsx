import classNames from 'classnames';
import { isNil } from 'lodash-es';
import React, {
  CSSProperties,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import './index.scss';

export interface SidebarProps {
  /**
   * @description 类名
   * @default ""
   */
  className?: string;
  /**
   * @description 样式
   */
  style?: CSSProperties;
  /**
   * @description 挂载位置
   * @default document.body
   */
  target?: HTMLElement | RefObject<HTMLDivElement>;
  /**
   * @description 排列方向
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * @description 对齐方向
   * @default 'end'
   */
  alignment?: 'start' | 'center' | 'end';
  /**
   * @description 位置
   * @default 'right'
   */
  placement?: 'left' | 'top' | 'right' | 'bottom';
  /**
   * @description 子元素配置项
   */
  itemOptions?: {
    gap?: number;
  };
  /**
   * @description 组件偏移量
   */
  offset?: {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
  };
  /**
   * @description 组件所在层级
   * @default 10
   */
  zIndex?: Pick<CSSProperties, 'zIndex'>;
  /**
   * @description 子元素
   */
  children?: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
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
  const [currentTarget, setCurrentTarget] = useState<HTMLElement>(
    document.body,
  );
  useEffect(() => {
    if (isNil(target)) return;
    if (!!(target as any)?.current)
      return setCurrentTarget(
        (target as RefObject<HTMLElement>)?.current as HTMLElement,
      );
    setCurrentTarget(target as HTMLElement);
  }, [target]);

  /** sidebar层级，默认 10 */
  const zIndexMemo = useMemo(
    () => ({ [isNil(zIndex) ? '' : '--sidebar-zIndex']: zIndex }),
    [zIndex],
  );

  /** 位置 */
  const positionMemo = useMemo(() => {
    const positionStyles: { [key: string]: any } = {};
    switch (placement) {
      case 'right':
        positionStyles['alignItems'] = 'end';
      case 'left': {
        positionStyles['height'] = '100%';
        positionStyles['width'] = '0px';
        positionStyles['flexDirection'] = 'column';
        switch (alignment) {
          case 'start':
            positionStyles['justifyContent'] = 'start';
            break;
          case 'center':
            positionStyles['justifyContent'] = 'center';
            break;
          case 'end':
            positionStyles['justifyContent'] = 'end';
            break;
        }
        break;
      }
      case 'bottom':
        positionStyles['alignItems'] = 'end';
      case 'top': {
        positionStyles['width'] = '100%';
        positionStyles['height'] = '0px';
        switch (alignment) {
          case 'start':
            positionStyles['justifyContent'] = 'start';
            break;
          case 'center':
            positionStyles['justifyContent'] = 'center';
            break;
          case 'end':
            positionStyles['justifyContent'] = 'end';
            break;
        }
      }
    }
    positionStyles[placement] = 0;
    return positionStyles;
  }, [placement, alignment]);

  /** 最终的样式 */
  const sidebarStyle = useMemo(
    () => ({
      ...zIndexMemo,
      ...positionMemo,
      ...style,
    }),
    [zIndexMemo, positionMemo, style],
  );

  /** 排列方向, 默认 vertical(垂直) */
  const { gap } = itemOptions ?? {};
  const directionMemo = useMemo(
    () => ({
      [isNil(gap) ? '' : '--sidebar-item-gap']: `${gap}px`,
    }),
    [gap],
  );

  /** 偏移量 */
  const translate = useMemo(() => {
    if (!offset) return {};
    const { top, left, bottom, right } = offset;
    return {
      transform: `translate(${left ?? (right ? -right : 0)}px, ${
        top ?? (bottom ? -bottom : 0)
      }px)`,
    };
  }, [offset]);

  return createPortal(
    <div className={classNames('sidebar', className)} style={sidebarStyle}>
      <div
        className={`sidebar-${direction}`}
        style={{ ...directionMemo, ...translate }}
      >
        {children}
      </div>
    </div>,
    currentTarget,
  );
};

export default Sidebar;
