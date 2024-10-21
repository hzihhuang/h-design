import { useMutation } from 'HDesign';
import React, { CSSProperties, useEffect, useMemo, useRef } from 'react';
import './index.scss';
import { WatermarkProps } from './types';
import { getClips, getMarkSize, getPixelRatio, getStyleStr, reRendering } from './utils';

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
      color: font?.color ?? 'rgba(0,0,0,.15)',
      fontSize: font?.fontSize ?? 16,
      fontStyle: font?.fontStyle ?? 'normal',
      fontWeight: font?.fontWeight ?? 'normal',
      fontFamily: font?.fontFamily ?? 'sans-serif',
      textAlign: font?.textAlign ?? 'center',
      textBaseline: font?.textBaseline ?? 'middle',
    }),
    [font],
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
          ...getMarkStyle(),
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

  useEffect(() => destroyWatermark, []);
  useEffect(renderWatermark, [font, gap, offset, zIndex, rotate, content, image, fontOption]);
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
  return (
    <div className="watermark" ref={containerRef}>
      {children}
    </div>
  );
};

export default Watermark;
