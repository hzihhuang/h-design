---
title: useVideoFrames
group:
  title: Video
  order: 2
order: 3
---

# useVideoFrames

Video Frame Decoding Hook

A streaming MP4 video decoder based on native `VideoDecoder` and `mp4box` that extracts video frames one by one. Suitable for scenarios where you need direct access to raw video frames for custom processing.

## Demo

<code src="./demo" description="Load a video by URL, decode it, and output all video frames."></code>

## Params

| Parameter     | Description                     | Type                             | Default |
| ------------- | ------------------------------- | -------------------------------- | ------- |
| url           | URL of the video resource       | `string`                         | `-`     |
| onTotalFrames | Callback when decoding finishes | `(frames: VideoFrame[]) => void` | `-`     |

## Result

| Parameter | Description               | Type           |
| --------- | ------------------------- | -------------- |
| frames    | Decoded video frames list | `VideoFrame[]` |
