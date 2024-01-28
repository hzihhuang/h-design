---
title: useResize
group:
  title: 元素
  order: 3
order: 1
---

# useResize

允许你订阅元素的尺寸变化。

## 演示

尝试拖动格子右下角，实现变化元素尺寸，可以打开控制器查看页面打印 console
<code src="./demo/index.tsx"></code>

## Params

| 参数     | 描述                           | 类型                               | 默认值 |
| -------- | ------------------------------ | ---------------------------------- | ------ |
| callback | 元素尺寸发生改变触发的回调函数 | `(e: ResizeObserverEntry) => void` | -      |
| target   | 订阅的元素                     | `Element`                          | -      |

## Result

| 参数      | 描述           | 类型         |
| --------- | -------------- | ------------ |
| unobserve | 解除订阅的函数 | `() => void` |
