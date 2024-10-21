import { useMutation } from 'HDesign';
import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import useClips, { FontGap } from './hooks/useClips';
import './index.scss';
import { getPixelRatio, getStyleStr, reRendering } from './utils';

export interface WatermarkFont {
  color?: string;
  fontSize?: number;
  fontWeight: 'normal' | 'light' | 'weight' | number;
  fontFamily: string;
  fontStyle: 'none' | 'normal' | 'italic' | 'oblique';
  textAlign: 'left' | 'right' | 'center' | 'start' | 'end';
  textBaseline: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
}
export interface WatermarkProps {
  width?: number;
  height?: number;
  rotate?: number;
  image?: string;
  content?: string | string[];
  font?: WatermarkFont;
  gap?: [number, number];
  offset?: [number, number];
  zIndex?: number;
  children?: React.ReactNode;
}

const Watermark: React.FC<WatermarkProps> = ({
  font,
  gap,
  offset,
  zIndex = 10,
  width = 120,
  height = 64,
  rotate = -22,
  image,
  content,
  children,
}) => {
  const fontOption = useMemo(
    () => ({
      color: font?.color ?? 'rgba(0,0,0,.15)',
      fontSize: font?.fontSize ?? 16,
      fontStyle: font?.fontStyle ?? 'normal',
      fontWeight: font?.fontWeight ?? 'normal',
      fontFamily: font?.fontFamily ?? 'sans-serif',
      textAlign: font?.textAlign ?? 'center',
      textBaseline: font?.textBaseline ?? 'middle',
    }),
    [],
  );

  const gapX = useMemo(() => gap?.[0] ?? 100, [gap]);
  const gapY = useMemo(() => gap?.[1] ?? 100, [gap]);
  const gapXCenter = useMemo(() => gapX / 2, [gapX]);
  const gapYCenter = useMemo(() => gapY / 2, [gapY]);
  const offsetLeft = useMemo(() => offset?.[0] ?? gapXCenter, [offset, gapXCenter]);
  const offsetTop = useMemo(() => offset?.[1] ?? gapYCenter, [offset, gapYCenter]);

  const getMarkStyle = () => {
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

  const containerRef = useRef<HTMLDivElement | null>(null);
  const watermarkRef = useRef<HTMLDivElement>();
  const [stopObservation, setStopObservation] = useState(false);

  const destroyWatermark = () => {
    if (watermarkRef.current) {
      watermarkRef.current.remove();
      watermarkRef.current = undefined;
    }
  };
  const appendWatermark = (base64Url: string, markWidth: number) => {
    if (containerRef.current && watermarkRef.current) {
      setStopObservation(true);
      watermarkRef.current.setAttribute(
        'style',
        getStyleStr({
          ...getMarkStyle(),
          backgroundImage: `url('${base64Url}')`,
          backgroundSize: `${Math.floor(markWidth)}px`,
        }),
      );
      containerRef.current?.append(watermarkRef.current);
      setTimeout(() => {
        setStopObservation(false);
      });
    }
  };

  const getMarkSize = (ctx: CanvasRenderingContext2D) => {
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

  const getClips = useClips();

  const renderWatermark = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (!watermarkRef.current) {
        watermarkRef.current = document.createElement('div');
      }

      const ratio = getPixelRatio();
      const [markWidth, markHeight] = getMarkSize(ctx);

      const drawCanvas = (drawContent?: NonNullable<WatermarkProps['content']> | HTMLImageElement) => {
        const [textClips, clipWidth] = getClips(
          drawContent || '',
          rotate,
          ratio,
          markWidth,
          markHeight,
          { ...fontOption },
          gapX,
          gapY,
        );

        appendWatermark(textClips, clipWidth);
      };

      if (image) {
        const img = new Image();
        img.onload = () => {
          drawCanvas(img);
        };
        img.onerror = () => {
          drawCanvas(content);
        };
        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.src = image;
      } else {
        drawCanvas(content);
      }
    }
  };

  useEffect(() => destroyWatermark, []);

  useEffect(() => {
    renderWatermark();
  }, [font, gap, offset, zIndex, rotate, content, image, fontOption]);

  useMutation(
    (mutation) => {
      if (stopObservation) {
        return;
      }
      if (reRendering(mutation, watermarkRef.current)) {
        destroyWatermark();
        renderWatermark();
      }
    },
    containerRef,
    {
      attributes: true,
      subtree: true,
      childList: true,
    },
  );
  return (
    <div className="watermark" ref={containerRef}>
      {children}
    </div>
  );
};

export default Watermark;
