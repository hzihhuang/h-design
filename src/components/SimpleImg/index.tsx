import classNames from 'classnames';
import React, {
  CSSProperties,
  ImgHTMLAttributes,
  useMemo,
  useRef,
} from 'react';
import useLazy from './hooks/useLazy';
import useLoading from './hooks/useLoading';
import './index.scss';

type SimpleImgProps = object;
type Props = SimpleImgProps & ImgHTMLAttributes<HTMLImageElement>;
/**
 * 简单的图片组件，只提供自己检测图片 loading 的功能、懒加载功能
 * @description 微组件：不添加额外功能，若需要增加功能请在外使用该组件再次封装
 */
const SimpleImg: React.FC<Props> = ({
  className,
  src,
  style,
  ...resetProps
}) => {
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
      pointerEvents: loading ? 'none' : undefined,
      userSelect: loading ? 'none' : undefined,
      ...style,
    }),
    [style, loading],
  );

  return (
    <img
      className={classNames('simple-img', className)}
      style={imgStyle}
      draggable={false}
      loading="lazy"
      ref={imgRef}
      {...resetProps}
    />
  );
};

export default SimpleImg;
