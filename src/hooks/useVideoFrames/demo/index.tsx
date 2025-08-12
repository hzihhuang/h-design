import { useVideoFrames } from 'HDesign';
import React, { useEffect, useRef } from 'react';
import url from '../../../assets/test.mp4';

const FrameCanvas = ({ frame, scale = 0.25 }: { frame: VideoFrame; scale?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    canvasRef.current.width = frame?.displayWidth * scale;
    canvasRef.current.height = frame?.displayHeight * scale;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(frame, 0, 0, canvasRef.current.width, canvasRef.current.height);

    return () => {
      frame.close(); // 释放 VideoFrame 资源，防止内存泄漏
    };
  }, [frame, scale]);

  return <canvas className="w-40 aspect-video cursor-pointer hover:opacity-80" ref={canvasRef} />;
};

const Index = () => {
  const { frames } = useVideoFrames({
    url,
  });

  return (
    <div>
      <div className="flex items-center gap-1 flex-wrap">
        {frames.map((i, idx) => (
          <FrameCanvas frame={i} key={idx} />
        ))}
      </div>
    </div>
  );
};
export default Index;
