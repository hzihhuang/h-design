import { WatermarkFont, WatermarkProps } from '../types';

interface GetMarkSizeOptionParams {
  fontOption: WatermarkFont;
  content: WatermarkProps['content'];
  image: WatermarkProps['image'];
  width: WatermarkProps['width'];
  height: WatermarkProps['height'];
}

export const FontGap = 3;

const getMarkSize = (
  ctx: CanvasRenderingContext2D,
  { fontOption, content, image, width, height }: GetMarkSizeOptionParams,
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

export default getMarkSize;
