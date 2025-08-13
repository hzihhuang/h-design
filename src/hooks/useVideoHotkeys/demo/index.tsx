import { useVideoHotkeys } from 'HDesign';
import React, { useRef } from 'react';

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoHotkeys(videoRef, {
    seekStep: 2, // 快进快退步长 2 秒
    volumeStep: 0.1, // 音量调节步长 0.1 => 10%
  });

  return (
    <div>
      <video
        className="w-full aspect-video object-cover"
        controls
        src="https://i.imgur.com/7GoEW65.mp4"
        ref={videoRef}
      ></video>
    </div>
  );
};
export default Index;
