import { VideoFrameViewer } from 'HDesign';
import React, { useEffect, useState } from 'react';

const Index: React.FC = () => {
  const [frames, setFrames] = useState<VideoFrame[]>([]);
  const [currentFrame, setCurrentFrame] = useState(-1);

  useEffect(() => {
    if (frames.length > 0) {
      // 初始化时，将当前帧设置为第一帧
      setCurrentFrame(0);
    }
  }, [frames]);
  return (
    <div>
      <VideoFrameViewer
        className="w-full aspect-video bg-blue-200"
        url="https://i.imgur.com/7GoEW65.mp4"
        currentFrame={currentFrame}
        onTotalFrames={setFrames}
      />
      <input
        className="w-full mt-12"
        type="range"
        min="0"
        max={frames.length}
        value={currentFrame}
        onChange={(e) => setCurrentFrame(Number(e.target.value))}
      />
    </div>
  );
};
export default Index;
