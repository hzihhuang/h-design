import { CSSProperties } from 'react';
import { WatermarkFont, WatermarkProps } from './types';

const FontGap = 3;

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

export const getMarkSize = (
  ctx: CanvasRenderingContext2D,
  {
    fontOption,
    content,
    image,
    width,
    height,
  }: {
    fontOption: WatermarkFont;
    content: WatermarkProps['content'];
    image: WatermarkProps['image'];
    width: WatermarkProps['width'];
    height: WatermarkProps['height'];
  },
) => {
  let defaultWidth = 120;
  let defaultHeight = 64;
  if (!image && ctx.measureText) {
    ctx.font = `${fontOption.fontSize}px ${fontOption.fontFamily}`;
    const contents = Array.isArray(content) ? content : [content];
    const sizes = contents.map((item) => {
      const metrics = ctx.measureText(item!);
      return [
        metrics.width,
        metrics.fontBoundingBoxAscent !== undefined
          ? metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
          : metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
      ];
    });
    defaultWidth = Math.ceil(Math.max(...sizes.map((size) => size[0])));
    defaultHeight =
      Math.ceil(Math.max(...sizes.map((size) => size[1]))) * contents.length + (contents.length - 1) * FontGap;
  }
  return [width ?? defaultWidth, height ?? defaultHeight] as const;
};

function prepareCanvas(
  width: number,
  height: number,
  ratio = 1,
): [ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, realWidth: number, realHeight: number] {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const realWidth = width * ratio;
  const realHeight = height * ratio;
  canvas.setAttribute('width', `${realWidth}px`);
  canvas.setAttribute('height', `${realHeight}px`);
  ctx.save();

  return [ctx, canvas, realWidth, realHeight];
}
export function getClips(
  content: NonNullable<WatermarkProps['content']> | HTMLImageElement,
  rotate: number,
  ratio: number,
  width: number,
  height: number,
  font: Required<NonNullable<WatermarkProps['font']>>,
  gapX: number,
  gapY: number,
): [dataURL: string, finalWidth: number, finalHeight: number] {
  const [ctx, canvas, contentWidth, contentHeight] = prepareCanvas(width, height, ratio);
  if (content instanceof HTMLImageElement) {
    ctx.drawImage(content, 0, 0, contentWidth, contentHeight);
  } else {
    const { color, fontSize, fontStyle, fontWeight, fontFamily, textAlign, textBaseline } = font;
    const mergedFontSize = Number(fontSize) * ratio;

    ctx.font = `${fontStyle} normal ${fontWeight} ${mergedFontSize}px/${height}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    const contents = Array.isArray(content) ? content : [content];
    contents?.forEach((item, index) => {
      ctx.fillText(item ?? '', contentWidth / 2, index * (mergedFontSize + FontGap * ratio));
    });
  }

  const angle = (Math.PI / 180) * Number(rotate);
  const maxSize = Math.max(width, height);
  const [rCtx, rCanvas, realMaxSize] = prepareCanvas(maxSize, maxSize, ratio);

  rCtx.translate(realMaxSize / 2, realMaxSize / 2);
  rCtx.rotate(angle);
  if (contentWidth > 0 && contentHeight > 0) {
    rCtx.drawImage(canvas, -contentWidth / 2, -contentHeight / 2);
  }

  function getRotatePos(x: number, y: number) {
    const targetX = x * Math.cos(angle) - y * Math.sin(angle);
    const targetY = x * Math.sin(angle) + y * Math.cos(angle);
    return [targetX, targetY];
  }

  let left = 0;
  let right = 0;
  let top = 0;
  let bottom = 0;

  const halfWidth = contentWidth / 2;
  const halfHeight = contentHeight / 2;
  const points = [
    [0 - halfWidth, 0 - halfHeight],
    [0 + halfWidth, 0 - halfHeight],
    [0 + halfWidth, 0 + halfHeight],
    [0 - halfWidth, 0 + halfHeight],
  ];
  points.forEach(([x, y]) => {
    const [targetX, targetY] = getRotatePos(x, y);
    left = Math.min(left, targetX);
    right = Math.max(right, targetX);
    top = Math.min(top, targetY);
    bottom = Math.max(bottom, targetY);
  });

  const cutLeft = left + realMaxSize / 2;
  const cutTop = top + realMaxSize / 2;
  const cutWidth = right - left;
  const cutHeight = bottom - top;

  const realGapX = gapX * ratio;
  const realGapY = gapY * ratio;
  const filledWidth = (cutWidth + realGapX) * 2;
  const filledHeight = cutHeight + realGapY;

  const [fCtx, fCanvas] = prepareCanvas(filledWidth, filledHeight);

  function drawImg(targetX = 0, targetY = 0) {
    fCtx.drawImage(rCanvas, cutLeft, cutTop, cutWidth, cutHeight, targetX, targetY, cutWidth, cutHeight);
  }
  drawImg();
  drawImg(cutWidth + realGapX, -cutHeight / 2 - realGapY / 2);
  drawImg(cutWidth + realGapX, +cutHeight / 2 + realGapY / 2);

  return [fCanvas.toDataURL(), filledWidth / ratio, filledHeight / ratio];
}

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
