---
title: useVideoHotkeys
group:
  title: Video
  order: 4
order: 2
---

# useVideoHotkeys

Keyboard shortcut hook for video control

Provides keyboard shortcut support for a video element, including default controls for play/pause, seek forward/backward, and volume adjustment. Custom shortcut mappings are also supported.

## Demo

<code src="./demo" description="Example demonstrating keyboard shortcuts to control video playback, seeking, and volume."></code>

## Params

| Parameter | Description                                             | Type                                                                                                      | Default |
| --------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------- |
| videoRef  | React ref to the video element                          | `React.RefObject<HTMLVideoElement>`                                                                       | `-`     |
| options   | Configuration including custom shortcuts and step sizes | `{ hotkeys?: Record<string, (video: HTMLVideoElement) => void>; seekStep?: number; volumeStep?: number }` | `{}`    |

### Options

| Field      | Description                  | Type                                                | Default |
| ---------- | ---------------------------- | --------------------------------------------------- | ------- |
| hotkeys    | Custom shortcut mappings     | `Record<string, (video: HTMLVideoElement) => void>` | `{}`    |
| seekStep   | Seconds to seek forward/back | `number`                                            | `5`     |
| volumeStep | Volume adjustment step (0~1) | `number`                                            | `0.1`   |

## Result

No return value. The hook listens globally for `keydown` events and controls the video accordingly.

## Default Shortcuts

| Key          | Function        |
| ------------ | --------------- |
| `Space`      | Play / Pause    |
| `ArrowRight` | Seek forward    |
| `ArrowLeft`  | Seek backward   |
| `ArrowUp`    | Increase volume |
| `ArrowDown`  | Decrease volume |
| `KeyM`       | Toggle mute     |
