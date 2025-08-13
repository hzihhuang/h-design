---
title: useVideoFrames
group:
  title: 视频
  order: 4
order: 1
---

# useVideoFrames

视频帧解码 Hook

基于原生 `VideoDecoder` 和 `mp4box` 实现的 MP4 视频流式解码，逐帧获取视频帧。适合需要访问视频帧数据进行自定义处理的场景。

## 演示

<code src="./demo" description="通过 URL 加载视频，解码并输出所有视频帧的示例。"></code>

## Params

| 参数          | 描述                 | 类型                             | 默认值 |
| ------------- | -------------------- | -------------------------------- | ------ |
| url           | 视频资源的 URL       | `string`                         | `-`    |
| onTotalFrames | 视频帧解码完成后回调 | `(frames: VideoFrame[]) => void` | `-`    |

## Result

| 参数   | 描述               | 类型           |
| ------ | ------------------ | -------------- |
| frames | 解码后的视频帧集合 | `VideoFrame[]` |
