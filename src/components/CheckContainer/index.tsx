import classNames from 'classnames';
import React, {
  CSSProperties,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import './index.scss';

interface CheckContainerProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** 是否选中 */
  checked?: boolean;
  /** 点击事件 */
  onClick?: (checked: boolean) => void;
  /**
   * 圆角大小
   * @default 8
   */
  radius?: number;
  /**
   * 边框宽度
   * @default 2
   */
  strokeWidth?: number;
  /**
   * 间距
   * @default 2
   */
  gap?: number;
  /**
   * 右上角控件尺寸
   * @default 16
   */
  size?: number;
  /**
   * 选择模式
   * @default 'radio'
   */
  type?: 'default' | 'radio' | 'checkbox';
  /**
   * 选中显示模式
   * @default 'checked'
   */
  mode?: 'hover' | 'checked' | 'always';
}

interface CheckContainerRef {
  containerRef: React.RefObject<HTMLDivElement>;
}

/**
 * 选中容器
 * 用来为元素添加选中功能
 */
const CheckContainer = forwardRef<CheckContainerRef, CheckContainerProps>(
  (props, ref) => {
    const {
      className = '',
      style,
      children,
      checked = false,
      onClick,
      radius = 8,
      strokeWidth = 2,
      gap = 2,
      size = 16,
      type = 'radio',
      mode = 'checked',
    } = props;

    // 角标类型
    const typeElement = useMemo(() => {
      switch (type) {
        case 'radio':
          return (
            <div
              className={classNames('radio-check', { checked: checked })}
            ></div>
          );
        case 'checkbox':
          return (
            <div
              className={classNames('checkbox-check', { checked: checked })}
            ></div>
          );
        default:
          return null;
      }
    }, [type, checked]);

    // 显示模式
    const modeElement = useMemo(() => {
      if (!typeElement) return null;
      switch (mode) {
        // hover 才会出现
        case 'hover':
          return <div className="hover-element">{typeElement}</div>;
        // hover 才会出现 选中之后一直出现
        case 'checked':
          return (
            <div
              className="check-element"
              style={{ opacity: checked ? 1 : undefined }}
            >
              {typeElement}
            </div>
          );
        // 一直存在
        case 'always':
          return <div className="always-element">{typeElement}</div>;
      }
    }, [mode, typeElement]);

    // 容器 ref
    const containerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(
      ref,
      () => ({
        containerRef,
      }),
      [],
    );

    return (
      <div
        className={classNames('check-container', className, {
          checked: checked,
        })}
        onClick={() => onClick?.(!checked)}
        style={{
          ...style,
          // @ts-ignore 圆角
          '--check-container-radius': `${radius}px`,
          '--check-container-stoke': `${strokeWidth}px`,
          '--check-container-gap': `${gap}px`,
          '--check-container-size': `${size}px`,
        }}
        ref={containerRef}
      >
        {children}
        {modeElement}
      </div>
    );
  },
);
export default CheckContainer;
