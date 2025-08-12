import React, { useEffect, useRef } from 'react';
import useVideoFrames from '../../hooks/useVideoFrames';
import useDrawFrame from './hooks/useDrawFrame';

interface VideoFrameViewerProps {
  className?: string;
  url: string;
  currentFrame: number;
  onTotalFrames?: (frames: VideoFrame[]) => void;
}

const VideoFrameViewer: React.FC<VideoFrameViewerProps> = ({ className, url, currentFrame, onTotalFrames }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /** 拿到视频所有画面 */
  const { frames } = useVideoFrames({
    url,
  });

  useEffect(() => onTotalFrames?.(frames), [frames]);

  /** 绘制画面 */
  useDrawFrame({
    canvasRef,
    frames,
    currentFrame,
  });

  return <canvas className={className} ref={canvasRef} />;
};

export default VideoFrameViewer;
