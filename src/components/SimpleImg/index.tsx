import classNames from 'classnames';
import React, { ImgHTMLAttributes, useEffect, useRef, useState } from 'react';

type SimpleImgProps = {
  /**
   * @description 定制加载样式，加载动画
   * @default ""
   */
  loadingClassName?: string;
};
type Props = SimpleImgProps & ImgHTMLAttributes<HTMLImageElement>;
/**
 * 简单的图片组件，只提供自己检测图片 loading 的功能、懒加载功能
 * @description 微组件：不添加额外功能，若需要增加功能请在外使用该组件再次封装
 */
const SimpleImg: React.FC<Props> = ({
  loadingClassName = '',
  className,
  src,
  style,
  ...resetProps
}) => {
  /**
   * loading 功能
   */
  const imgRef = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // 用于在组件内部加载图片，加载完成后替换src到页面上（可以避免图片在页面上因为加载过慢而产生的割裂感）
  const loadingImgRef = useRef<HTMLDivElement>(document.createElement('img'));
  useEffect(() => {
    if (!imgRef.current) return;
    const observerCallback: MutationCallback = (e) => {
      e.forEach((i) => {
        const img = i.target as HTMLImageElement;
        setLoading(true);
        if (img.complete) setLoading(false);
      });
    };
    const observer = new MutationObserver(observerCallback);
    observer.observe(loadingImgRef.current, {
      attributes: true,
      attributeFilter: ['src'],
    });

    const loadingCallback = () => {
      imgRef.current?.setAttribute(
        'src',
        loadingImgRef.current.getAttribute('src') as string,
      );
      setTimeout(() => {
        setLoading(false);
      }, 200);
    };
    loadingImgRef.current.addEventListener('load', loadingCallback);
    loadingImgRef.current.addEventListener('error', loadingCallback);
    return () => {
      observer.disconnect();
      loadingImgRef.current.removeEventListener('load', loadingCallback);
      loadingImgRef.current.removeEventListener('error', loadingCallback);
    };
  }, []);

  /**
   * 图片懒加载功能
   * 当图片出现在页面上 src 上的值才会被放上去。
   */
  useEffect(() => {
    if (!imgRef.current || src === undefined) return;
    const callback: IntersectionObserverCallback = (e) => {
      e.forEach((i) => {
        if (i.isIntersecting) loadingImgRef.current.setAttribute('src', src);
      });
    };
    const observer = new IntersectionObserver(callback, {
      root: document,
      threshold: [0],
    });
    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [src]);

  return (
    <img
      className={classNames(className, 'simple-img', {
        [loadingClassName]: loading,
      })}
      style={{ objectFit: 'cover', imageRendering: 'pixelated', ...style }}
      draggable={false}
      ref={imgRef}
      {...resetProps}
    />
  );
};

export default SimpleImg;
