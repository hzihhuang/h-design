import { useCallback, useEffect, useRef } from 'react';
import { draw2DFrame } from '../utils/draw2DFrame';
import drawWebGLFrame from '../utils/drawWebGLFrame';

interface useDrawFrameProps {
  frames: VideoFrame[];
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  currentFrame: number;
}

export default function useDrawFrame({ frames, canvasRef, currentFrame }: useDrawFrameProps) {
  const ctxRef = useRef<CanvasRenderingContext2D | WebGLRenderingContext | null>(null);

  /** 绘制某一帧 */
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      const frame = frames[index];
      if (canvas && ctx && frame) {
        if (ctx instanceof CanvasRenderingContext2D) {
          draw2DFrame(frame, canvas, ctx);
        } else {
          drawWebGLFrame(frame, canvas, ctx);
        }
      }
    },
    [canvasRef, frames],
  );

  /** 初始化 canvas 尺寸和上下文 */
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!ctxRef.current) {
      ctxRef.current = canvas.getContext('webgl') || canvas.getContext('2d');
    }
    const { width, height } = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    if (ctxRef.current && ctxRef.current instanceof CanvasRenderingContext2D) {
      ctxRef.current.scale(dpr, dpr);
    } else {
      ctxRef.current?.viewport(0, 0, canvas.width, canvas.height);
    }
    drawFrame(currentFrame);
  }, [canvasRef, currentFrame, drawFrame]);

  /** 初始化 Canvas 尺寸 */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => {
      window.removeEventListener('resize', initCanvas);
    };
  }, [initCanvas]);
}
