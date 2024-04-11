import classNames from 'classnames';
import React, {
  CSSProperties,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import useHasScroll from './hooks/useHasScroll';
import useScrollControl from './hooks/useScrollControl';
import './index.scss';

interface ThumbOptions {
  /**
   * @default 4
   * @description 距离边上的距离
   */
  gap?: number;
  /**
   * @default 4
   * @description 滚动条的尺寸
   */
  size?: number;
  /**
   * @default #000
   * @description 背景
   */
  background?: string;
  /**
   * @default none
   * @description 边框
   */
  border?: string;
  /**
   * @default 999
   * @description 圆角
   */
  radius?: number | string;
  /**
   * @default 1
   * @description 透明度
   */
  opacity?: number;
}
interface ScrollContainerRef {
  /** 组件最外层容器 */
  mainRef: React.RefObject<HTMLDivElement>;
  /** 触发滚动条容器 */
  containerRef: React.RefObject<HTMLDivElement>;
  /** 包裹 children 的容器 */
  contentRef: React.RefObject<HTMLDivElement>;
  /** 横向滚动条 */
  scrollThumbXRef: React.RefObject<HTMLDivElement>;
  /** 纵向滚动条 */
  scrollThumbYRef: React.RefObject<HTMLDivElement>;
}

type Props = {
  /** 组件最外层 div className */
  className?: string;
  /** 组件最外层 div style */
  style?: CSSProperties;
  /** 包裹 children div style */
  containerStyle?: CSSProperties;
  /** 包裹 children div className */
  containerClassName?: string;
  /** 滚动条配置 */
  thumbOptions?: ThumbOptions;
  children?: React.ReactNode;
};
const DEFAULT_THUMB_OPTIONS: ThumbOptions = {
  gap: 4,
  size: 4,
  background: '#000',
  border: 'none',
  radius: 999,
  opacity: 1,
};
/**
 * 滚动条容器组件，提供可高度自定义滚动条的容器。
 */
const ScrollContainer = forwardRef<ScrollContainerRef, Props>(
  (
    {
      className,
      style,
      containerStyle,
      containerClassName,
      thumbOptions = DEFAULT_THUMB_OPTIONS,
      children,
    },
    ref,
  ) => {
    const curOptions = {
      ...DEFAULT_THUMB_OPTIONS,
      ...thumbOptions,
    };

    /** 滚动条是否存在检测 */
    const containerRef = useRef<HTMLDivElement>(null);
    const { hasScroll } = useHasScroll({
      children,
      containerRef,
    });

    /** 滚动条逻辑 */
    const scrollThumbXRef = useRef<HTMLDivElement>(null);
    const scrollThumbYRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { onThumbX, onThumbY, handlerScroll } = useScrollControl({
      children,
      containerRef,
      contentRef,
      scrollThumbXRef,
      scrollThumbYRef,
    });

    /** 暴露给外部 */
    const mainRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(
      ref,
      () => ({
        mainRef,
        containerRef,
        contentRef,
        scrollThumbXRef,
        scrollThumbYRef,
      }),
      [],
    );

    return (
      <div
        className={classNames('scroll-container', className)}
        style={{
          // @ts-ignore
          '--scroll-thumb-gap': `${curOptions.gap}px`,
          '--scroll-thumb-size': `${curOptions.size}px`,
          '--scroll-thumb-background': curOptions.background,
          '--scroll-thumb-border': curOptions.border,
          '--scroll-thumb-border-radius':
            typeof curOptions.radius === 'string'
              ? curOptions.radius
              : `${curOptions.radius}px`,
          '--scroll-thumb-opacity': curOptions.opacity,
          ...style,
        }}
        ref={mainRef}
      >
        <div
          className={classNames('scroll-container-content', containerClassName)}
          style={containerStyle}
          onScroll={handlerScroll}
          ref={containerRef}
        >
          <div ref={contentRef}>{children}</div>
        </div>
        <div
          className={classNames('scroll-thumb', 'scroll-thumb-y', {
            show: hasScroll.hasY,
          })}
          onMouseDown={onThumbY}
          ref={scrollThumbYRef}
        />
        <div
          className={classNames('scroll-thumb', 'scroll-thumb-x', {
            show: hasScroll.hasX,
          })}
          onMouseDown={onThumbX}
          ref={scrollThumbXRef}
        />
      </div>
    );
  },
);

export default ScrollContainer;
