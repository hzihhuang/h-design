import classNames from 'classnames';
import React, { CSSProperties, TextareaHTMLAttributes, useRef } from 'react';
import usePreviewElement, {
  previewElementOptions,
} from './hooks/usePreviewElement';
import useSynchronousScroll from './hooks/useSynchronousScroll';
import './index.scss';

export type Props = {
  /** 容器 class */
  containerClassName?: string;
  /** 容器 style */
  containerStyle?: CSSProperties;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value'> &
  previewElementOptions;

/**
 * 支持错误文案高亮的输入框
 */
const HighlightTextarea: React.FC<Props> = ({
  highlight,
  formatHighlight,
  containerClassName,
  containerStyle,
  className,
  style,
  value,
  onScroll,
  onChange,
  ...resetProps
}) => {
  /** 同步滚动条位置 */
  const boxRef = useRef<HTMLDivElement>(null);
  const currentTextAreaRef = useRef<HTMLTextAreaElement>(null);

  /** 同步 div 和 textarea 的滚动条 */
  const { handlerChange, handlerScroll } = useSynchronousScroll({
    onChange,
    onScroll,
    boxRef,
    currentTextAreaRef,
  });

  /** 展示数据 */
  const previewElement = usePreviewElement({
    value,
    highlight,
    formatHighlight,
  });

  return (
    <div
      className={classNames('highlight-textarea-container', containerClassName)}
      style={containerStyle}
    >
      <div className={className} style={style} ref={boxRef}>
        {previewElement}
        {/* ps：为了让 div scrollHeight 高度一定超过 textarea scrollHeight */}
        <div style={{ height: 200 }} />
      </div>
      <textarea
        {...resetProps}
        className={className}
        style={style}
        value={value}
        onScroll={handlerScroll}
        onChange={handlerChange}
        ref={currentTextAreaRef}
      />
    </div>
  );
};
export default HighlightTextarea;
