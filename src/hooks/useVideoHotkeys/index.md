---
title: useVideoHotkeys
group:
  title: 视频
  order: 4
order: 2
---

# useVideoHotkeys

视频快捷键控制 Hook

为视频元素提供键盘快捷键支持，默认包含播放/暂停、快进、快退、音量调节等常用操作，并支持自定义快捷键映射。

## 演示

<code src="./demo" description="通过键盘快捷键控制视频播放、跳转和音量的示例。"></code>

## Params

| 参数     | 描述                               | 类型                                                                                                      | 默认值 |
| -------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------- | ------ |
| videoRef | 视频元素的 `ref`                   | `React.RefObject<HTMLVideoElement>`                                                                       | `-`    |
| options  | 配置项，包括自定义快捷键、步进参数 | `{ hotkeys?: Record<string, (video: HTMLVideoElement) => void>; seekStep?: number; volumeStep?: number }` | `{}`   |

### options

| 字段       | 描述                  | 类型                                                | 默认值 |
| ---------- | --------------------- | --------------------------------------------------- | ------ |
| hotkeys    | 自定义快捷键映射      | `Record<string, (video: HTMLVideoElement) => void>` | `{}`   |
| seekStep   | 快进/快退的秒数       | `number`                                            | `5`    |
| volumeStep | 音量调节的步进（0~1） | `number`                                            | `0.1`  |

## Result

无返回值。调用 Hook 后，会在全局监听 `keydown` 事件，根据按键控制视频。

## 默认快捷键

| 按键         | 功能          |
| ------------ | ------------- |
| `Space`      | 播放/暂停     |
| `ArrowRight` | 快进          |
| `ArrowLeft`  | 快退          |
| `ArrowUp`    | 音量增加      |
| `ArrowDown`  | 音量减少      |
| `KeyM`       | 静音/取消静音 |
