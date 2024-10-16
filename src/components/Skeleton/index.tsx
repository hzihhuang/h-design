import classNames from 'clsx';
import React, { CSSProperties, useMemo } from 'react';
import './index.scss';

export interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
  width?: string | number;
  height?: string | number;
  radius?: string | number;
}
const Skeleton: React.FC<SkeletonProps> = ({ className, style, radius, width, height }) => {
  const curStyle = useMemo<CSSProperties>(
    () => ({
      ...style,
      width: width ?? 'var(--skeleton-width)',
      height: height ?? 'var(--skeleton-height)',
      borderRadius: radius ?? 'var(--skeleton-radius)',
    }),
    [style, radius, width, height],
  );
  return <div className={classNames('skeleton', className)} style={curStyle}></div>;
};

export default Skeleton;
