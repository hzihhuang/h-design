import classNames from 'classnames';
import React, {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import './index.scss';

export interface AutoRatioContainerRef {
  containerRef: React.RefObject<HTMLDivElement>;
  boxRef: React.RefObject<HTMLDivElement>;
}

export interface AutoRatioContainerProps {
  /**
   * @description 容器的比例
   * @default 1
   */
  ratio?: number;
  /**
   * @description 容器元素 className
   * @default ""
   */
  className?: string;
  /**
   * @description 容器元素 style
   */
  style?: React.CSSProperties;
  /**
   * @description 内部容器元素 className
   * @default ""
   */
  boxClassName?: string;
  /**
   * @description 内部容器元素 style
   */
  boxStyle?: React.CSSProperties;
  /**
   * 子元素
   */
  children?: ReactNode;
}

const AutoRatioContainer = forwardRef<
  AutoRatioContainerRef,
  AutoRatioContainerProps
>((props, ref) => {
  const {
    ratio = 1,
    children,
    className = '',
    boxStyle,
    boxClassName = '',
    style,
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  /** 根据比例判断以 width or height 为基准  */
  const [reference, setReference] = useState<'width' | 'height'>('width');
  // 缩放的时候根据父级对比比例
  useEffect(() => {
    if (!containerRef.current) return;
    const callback: ResizeObserverCallback = (entries) => {
      entries.forEach((item) => {
        const { width, height } = item.contentRect;
        const { width: childWidth, height: childHeight } = (
          item.target.firstChild as HTMLDivElement
        ).getBoundingClientRect?.();
        setReference(() => {
          // 比例等于 1 的时候根据父元素宽高来做
          if (ratio === 1) return width > height ? 'height' : 'width';
          if (width / height > childWidth / childHeight) return 'height';
          return 'width';
        });
      });
    };
    const resizeObserver = new ResizeObserver(callback);
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [ratio]);

  useImperativeHandle(
    ref,
    () => ({
      containerRef,
      boxRef,
    }),
    [],
  );

  return (
    <div
      className={classNames('auto-ratio-container', className)}
      style={style}
      ref={containerRef}
    >
      <div
        className={classNames('auto-ratio-box', boxClassName)}
        style={{
          ...(boxStyle ?? {}),
          aspectRatio: `${ratio}`,
          [reference]: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
});

export default AutoRatioContainer;
