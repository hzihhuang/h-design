import classNames from 'classnames';
import React, { CSSProperties, ReactNode, useMemo } from 'react';
import './index.scss';

type CheckContainerProps = {
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
};

/**
 * 选中容器
 * 用来为元素添加选中功能
 */
const CheckContainer: React.FC<CheckContainerProps> = ({
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
}) => {
  const modeElement = useMemo(() => {
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

  // 角标
  const selectMark = useMemo(() => {
    if (!modeElement) return null;
    switch (mode) {
      // hover 才会出现
      case 'hover':
        return <div className="hover-element">{modeElement}</div>;
      // hover 才会出现 选中之后一直出现
      case 'checked':
        return (
          <div
            className="check-element"
            style={{ opacity: checked ? 1 : undefined }}
          >
            {modeElement}
          </div>
        );
      // 一直存在
      case 'always':
        return <div className="always-element">{modeElement}</div>;
    }
  }, [mode, modeElement]);

  return (
    <div
      className={classNames('check-container', className, { checked: checked })}
      onClick={() => onClick?.(!checked)}
      style={{
        ...style,
        // @ts-ignore 圆角
        '--check-container-radius': `${radius}px`,
        '--check-container-stoke': `${strokeWidth}px`,
        '--check-container-gap': `${gap}px`,
        '--check-container-size': `${size}px`,
      }}
    >
      {children}
      {selectMark}
    </div>
  );
};
export default CheckContainer;
