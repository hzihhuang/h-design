import { CSSProperties } from 'react';

// "MyFunctionName" => "my-function-name"
export function toLowercaseSeparator(key: string) {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase();
}

// 获取 行内样式 字符串
export function getStyleStr(style: CSSProperties): string {
  return Object.keys(style)
    .map((key) => `${toLowercaseSeparator(key)}: ${style[key as keyof CSSProperties]};`)
    .join(' ');
}

// 获取 比例
export function getPixelRatio() {
  return window.devicePixelRatio || 1;
}

// 判断水印元素（watermarkElement）是否需要重新渲染。
export const reRendering = (mutation: MutationRecord, watermarkElement?: HTMLElement) => {
  let flag = false;
  // 判断是否是水印元素被移除
  if (mutation.removedNodes.length && watermarkElement) {
    flag = Array.from(mutation.removedNodes).includes(watermarkElement);
  }
  // 判断是否是水印元素的属性被修改
  if (mutation.type === 'attributes' && mutation.target === watermarkElement) {
    flag = true;
  }
  return flag;
};

export const getMarkStyle = ({
  zIndex,
  gapX,
  gapY,
  offset,
}: {
  zIndex: number;
  gapX: number;
  gapY: number;
  offset?: number[];
}) => {
  const gapXCenter = gapX / 2;
  const gapYCenter = gapY / 2;
  const offsetLeft = offset?.[0] ?? gapXCenter;
  const offsetTop = offset?.[1] ?? gapYCenter;
  const markStyle: CSSProperties = {
    zIndex,
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    backgroundRepeat: 'repeat',
  };

  let positionLeft = offsetLeft - gapXCenter;
  let positionTop = offsetTop - gapYCenter;
  if (positionLeft > 0) {
    markStyle.left = `${positionLeft}px`;
    markStyle.width = `calc(100% - ${positionLeft}px)`;
    positionLeft = 0;
  }
  if (positionTop > 0) {
    markStyle.top = `${positionTop}px`;
    markStyle.height = `calc(100% - ${positionTop}px)`;
    positionTop = 0;
  }
  markStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;

  return markStyle;
};
