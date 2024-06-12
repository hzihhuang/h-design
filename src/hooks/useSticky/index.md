---
title: useSticky
group:
  title: 元素
  order: 4
order: 2
---

# useSticky

通过这个方法可以让元素不受滚动影响，钉在页面的某个位置。类似 **position: sticky**;

## 演示

<code src="./demo/vertical.tsx" description="仅处理了 Y 轴的滚动, 也是默认的行为">垂直方向</code>

<code src="./demo/horizontal.tsx" description="仅处理了 X 轴的滚动, 需要使用 direction 配置控制">水平方向</code>

<code src="./demo/both.tsx" description="同时处理了 X 和 Y 轴的滚动, 需要使用 direction 配置控制，不建议使用，会产生不必要的计算">同时垂直和水平方向</code>

## options

| 参数      | 描述                     | 类型                             | 默认值     |
| --------- | ------------------------ | -------------------------------- | ---------- |
| top       | 距离 `top` 多远开始固定  | `number`                         | `0`        |
| left      | 距离 `left` 多远开始固定 | `number`                         | `0`        |
| direction | 需要计算固定的方向       | `horizontal`、`vertical`、`both` | `vertical` |

## Result

| 参数          | 描述                   | 类型                              | 默认值                               |
| ------------- | ---------------------- | --------------------------------- | ------------------------------------ |
| stickyElement | 指定需要固定元素       | `React.RefObject<HTMLDivElement>` | `-`                                  |
| scrollElement | 指定带有滚动条的父元素 | `React.RefObject<HTMLDivElement>` | `自动寻找最近一个拥有滚动条的父元素` |
