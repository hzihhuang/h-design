import { useMutation } from 'HDesign';
import React, { useEffect, useMemo, useRef } from 'react';
import './index.scss';
import { WatermarkProps } from './types';
import { getMarkStyle, getPixelRatio, getStyleStr, reRendering } from './utils';
import getClips from './utils/getClips';
import getMarkSize from './utils/getMarkSize';

const Watermark: React.FC<WatermarkProps> = ({
  font,
  gap,
  offset,
  zIndex = 10,
  width,
  height,
  rotate = -45,
  image,
  content,
  children,
}) => {
  const fontOption = useMemo(
    () => ({
      color: font?.color ?? 'rgba(0,0,0,.1)',
      fontSize: font?.fontSize ?? 18,
      fontStyle: font?.fontStyle ?? 'normal',
      fontWeight: font?.fontWeight ?? 'normal',
      fontFamily: font?.fontFamily ?? 'sans-serif',
      textAlign: font?.textAlign ?? 'center',
      textBaseline: font?.textBaseline ?? 'hanging',
    }),
    [font],
  );
  const gapX = useMemo(() => gap?.[0] ?? 100, [gap]);
  const gapY = useMemo(() => gap?.[1] ?? 100, [gap]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const watermarkRef = useRef<HTMLDivElement>();
  const stopObservation = useRef(false);

  const destroyWatermark = () => {
    if (watermarkRef.current) {
      watermarkRef.current.remove();
      watermarkRef.current = undefined;
    }
  };
  const appendWatermark = (base64Url: string, markWidth: number) => {
    if (containerRef.current && watermarkRef.current) {
      stopObservation.current = true;
      watermarkRef.current.setAttribute(
        'style',
        getStyleStr({
          ...getMarkStyle({
            zIndex,
            gapX,
            gapY,
            offset,
          }),
          backgroundImage: `url('${base64Url}')`,
          backgroundSize: `${Math.floor(markWidth)}px`,
        }),
      );
      containerRef.current?.append(watermarkRef.current);
      setTimeout(() => {
        stopObservation.current = false;
      });
    }
  };

  const renderWatermark = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (!watermarkRef.current) {
        watermarkRef.current = document.createElement('div');
      }

      const ratio = getPixelRatio();
      const [markWidth, markHeight] = getMarkSize(ctx, {
        fontOption,
        content,
        image,
        width,
        height,
      });

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

  useMutation(
    (mutation) => {
      if (stopObservation.current) {
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
  useEffect(() => destroyWatermark, []);
  useEffect(renderWatermark, [font, gap, offset, zIndex, rotate, content, image, fontOption]);

  return (
    <div className="watermark" ref={containerRef}>
      {children}
    </div>
  );
};

export default Watermark;
