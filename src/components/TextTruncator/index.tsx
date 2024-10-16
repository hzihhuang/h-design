import classNames from 'clsx';
import React, { CSSProperties, ReactNode } from 'react';
import './index.scss';

export interface TextTruncatorProps {
  className?: string;
  style?: CSSProperties;
  /**
   * @description 子元素
   */
  children?: ReactNode;
}

const TextTruncator: React.FC<TextTruncatorProps> = ({ className, style }) => {
  return (
    <div className={classNames('text-truncator', className)} style={style}>
      文本截断器
    </div>
  );
};

export default TextTruncator;
