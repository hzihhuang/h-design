import classNames from 'clsx';
import React, { CSSProperties, ImgHTMLAttributes, useMemo, useRef } from 'react';
import useLazy from './hooks/useLazy';
import useLoading from './hooks/useLoading';
import './index.scss';

type SimpleImgProps = {
  wrapClassName?: string;
  wrapStyle?: CSSProperties;
  radius?: string | number;
};
type Props = SimpleImgProps & ImgHTMLAttributes<HTMLImageElement>;
/**
 * 简单的图片组件，只提供自己检测图片 loading 的功能、懒加载功能
 * @description 微组件：不添加额外功能，若需要增加功能请在外使用该组件再次封装
 */
const SimpleImg: React.FC<Props> = ({ className, src, style, wrapClassName, wrapStyle, radius = 6, ...resetProps }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  /** 懒加载 */
  useLazy({ src, imgRef });
  /** loading */
  const { loading } = useLoading({ src, imgRef });
  const imgStyle: CSSProperties = useMemo(
    () => ({
      objectFit: 'cover',
      imageRendering: 'pixelated',
      opacity: loading ? 0 : 1,
      borderRadius: radius,
      ...style,
    }),
    [style, loading, radius],
  );
  const wrapStyleMemo: CSSProperties = useMemo(
    () => ({
      pointerEvents: loading ? 'none' : void 0,
      userSelect: loading ? 'none' : void 0,
      backgroundColor: loading ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
      borderRadius: radius,
      ...wrapStyle,
    }),
    [loading, wrapStyle, radius],
  );

  return (
    <div className={classNames('simple-img-wrap', wrapClassName)} style={wrapStyleMemo}>
      <img
        className={classNames('simple-img', className)}
        style={imgStyle}
        draggable={false}
        loading="lazy"
        ref={imgRef}
        {...resetProps}
      />
    </div>
  );
};

export default SimpleImg;
