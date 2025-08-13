---
title: useLocalStorageState
group:
  title: 状态
  order: 1
order: 3
---

# useLocalStorageKeys

管理 localStorage 中指定 keys 的状态 Hook

`useLocalStorageKeys` 允许你传入一组 localStorage 的 key 数组，返回这些 key 对应的当前值状态对象，以及通过 `dispatch(key, value)` 方法更新指定 key 的值。

支持跨标签页和同标签页实时同步更新，确保状态在多窗口中保持一致。

## 演示

<code src="./demo" description="演示如何同步多个 localStorage key，支持跨标签页和组件更新">Demo</code>

## 参数说明

| 参数 | 描述                              | 类型       | 必填 |
| ---- | --------------------------------- | ---------- | ---- |
| keys | 需要管理的 localStorage keys 数组 | `string[]` | 是   |

## 返回值

| 参数     | 描述                   | 类型                                           |
| -------- | ---------------------- | ---------------------------------------------- |
| state    | 当前管理 keys 对应的值 | `{ [key: string]: string \| null }`            |
| dispatch | 更新指定 key 的值      | `(key: string, value: string \| null) => void` |

- `state` 中每个 key 的值为对应 localStorage 的字符串内容，若 localStorage 无该 key，则为 `null`
- 通过 `dispatch` 更新某 key 的值，传入 `null` 会删除对应的 localStorage 条目

## 特性

- 初始化时自动读取 localStorage 里的对应值
- 调用 `dispatch` 会同步更新 localStorage 并广播消息
- 监听浏览器 `storage` 事件，实现跨标签页同步
- 利用 BroadcastChannel 实现同标签页多组件同步
