import { useEffect } from 'react';

type HotkeyAction = (video: HTMLVideoElement) => void;

export interface UseVideoHotkeysOptions {
  hotkeys?: Record<string, HotkeyAction>;
  seekStep?: number; // 快进/快退秒数
  volumeStep?: number; // 音量步进
}

function useVideoHotkeys(videoRef: React.RefObject<HTMLVideoElement | null>, options: UseVideoHotkeysOptions = {}) {
  const { hotkeys = {}, seekStep = 5, volumeStep = 0.1 } = options;

  useEffect(() => {
    if (!videoRef?.current) return;
    const video = videoRef.current;
    if (!video) return;

    const defaultHotkeys: Record<string, HotkeyAction> = {
      Space: (v) => {
        // 空格键 播放/暂停
        if (v.paused) v.play();
        else v.pause();
      },
      ArrowRight: (v) => {
        // 右箭头 快进
        v.currentTime = Math.min(v.duration, v.currentTime + seekStep);
      },
      ArrowLeft: (v) => {
        // 左箭头 快退
        v.currentTime = Math.max(0, v.currentTime - seekStep);
      },
      ArrowUp: (v) => {
        // 上箭头 音量+
        v.volume = Math.min(1, v.volume + volumeStep);
      },
      ArrowDown: (v) => {
        // 下箭头 音量-
        v.volume = Math.max(0, v.volume - volumeStep);
      },
      KeyM: (v) => {
        v.muted = !v.muted;
      }, // M 静音
      ...hotkeys,
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const action = defaultHotkeys[e.code];
      if (action) {
        e.preventDefault();
        action(video);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [videoRef, hotkeys, seekStep, volumeStep]);
}

export default useVideoHotkeys;
