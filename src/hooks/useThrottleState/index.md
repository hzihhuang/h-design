---
title: useThrottleState
group:
  title: 状态
  order: 1
order: 2
---

# useThrottleState

节流 State

快速切换时，使用 `useThrottleState` 代替 `useState` 来减少渲染次数。

## 演示

<code src="./demo" description="这个例子节流时间为 1000ms，快速点击 +1 进行尝试">例子</code>

## Params

| 参数  | 描述       | 类型     | 默认值 |
| ----- | ---------- | -------- | ------ |
| value | 状态初始值 | `T`      | `-`    |
| delay | 节流时间   | `number` | `-`    |

## Result

| 参数     | 描述         | 类型                          |
| -------- | ------------ | ----------------------------- |
| state    | 当前状态     | `T`                           |
| setState | 设置当前状态 | `Dispatch<SetStateAction<T>>` |
