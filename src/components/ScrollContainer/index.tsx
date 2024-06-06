import classNames from 'classnames';
import React, {
  CSSProperties,
  forwardRef,
  useImperativeHandle,
  useMemo,
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
  /** 包裹 children div className */
  containerClassName?: string;
  /** 包裹 children div style */
  containerStyle?: CSSProperties;
  /** 滚动条配置 */
  thumbOptions?: ThumbOptions;
  /** 滚动条 hover 配置 */
  hoverThumbOptions?: ThumbOptions;
  children?: React.ReactNode;
};

/** 默认样式 */
const DEFAULT_THUMB_OPTIONS = {
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
const ScrollContainer = forwardRef<ScrollContainerRef, Props>((props, ref) => {
  const {
    className,
    style,
    containerStyle,
    containerClassName,
    thumbOptions = DEFAULT_THUMB_OPTIONS,
    hoverThumbOptions,
    children,
  } = props;
  const curOptions = {
    ...DEFAULT_THUMB_OPTIONS,
    ...thumbOptions,
  };
  /** 样式配置 */
  const styleOptions = useMemo(() => {
    const unifiedUnit = (v?: number | string) =>
      typeof v === 'number' ? `${v}px` : v;
    return {
      '--scroll-thumb-gap': unifiedUnit(curOptions.gap),
      '--scroll-thumb-size': unifiedUnit(curOptions.size),
      '--scroll-thumb-border-radius': unifiedUnit(curOptions.radius),
      '--scroll-thumb-background': curOptions.background,
      '--scroll-thumb-border': curOptions.border,
      '--scroll-thumb-opacity': curOptions.opacity,
      '--scroll-thumb-hover-gap': unifiedUnit(hoverThumbOptions?.gap),
      '--scroll-thumb-hover-size': unifiedUnit(hoverThumbOptions?.size),
      '--scroll-thumb-hover-border-radius': unifiedUnit(
        hoverThumbOptions?.radius,
      ),
      '--scroll-thumb-hover-background': hoverThumbOptions?.background,
      '--scroll-thumb-hover-border': hoverThumbOptions?.border,
      '--scroll-thumb-hover-opacity': hoverThumbOptions?.opacity,
      ...style,
    };
  }, [thumbOptions, style, hoverThumbOptions, curOptions]);

  /** 滚动条是否存在检测 */
  const containerRef = useRef<HTMLDivElement>(null);
  const { hasScroll } = useHasScroll({
    children,
    containerRef,
  });

  /** 滚动条逻辑 */
  const scrollThumbXRef = useRef<HTMLDivElement>(null);
  const scrollThumbYRef = useRef<HTMLDivElement>(null);
  const { onThumbX, onThumbY, handlerScroll } = useScrollControl({
    children,
    containerRef,
    scrollThumbXRef,
    scrollThumbYRef,
    gap: curOptions.gap,
    size: curOptions.size,
  });

  /** 暴露给外部 */
  const mainRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(
    ref,
    () => ({
      mainRef,
      containerRef,
      scrollThumbXRef,
      scrollThumbYRef,
    }),
    [],
  );

  return (
    <div
      className={classNames('scroll-container', className)}
      style={styleOptions}
      ref={mainRef}
    >
      <div
        className={classNames('scroll-container-content', containerClassName)}
        style={containerStyle}
        onScroll={handlerScroll}
        ref={containerRef}
      >
        {children}
      </div>
      <div
        className={classNames('scroll-thumb scroll-thumb-y', {
          show: hasScroll.hasY,
        })}
        onMouseDown={onThumbY}
        ref={scrollThumbYRef}
      />
      <div
        className={classNames('scroll-thumb scroll-thumb-x', {
          show: hasScroll.hasX,
        })}
        onMouseDown={onThumbX}
        ref={scrollThumbXRef}
      />
    </div>
  );
});

export default ScrollContainer;
