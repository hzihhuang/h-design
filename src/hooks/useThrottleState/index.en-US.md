---
title: useThrottleState
group:
  title: state
  order: 1
order: 2
---

# useThrottleState

throttling State

When fast switching, use `useThrottleState` instead of `useState` to reduce the number of renderings.

## Example

<code src="./demo" description="The example has a throttling time of 1000ms, quickly click `+1` to try it.">demo</code>

## Params

| Param | Description         | Type     | Default |
| ----- | ------------------- | -------- | ------- |
| value | Initial State Value | `T`      | `-`     |
| delay | throttling time     | `number` | `-`     |

## Result

| Param    | Description        | Type                          |
| -------- | ------------------ | ----------------------------- |
| state    | Current Status     | `T`                           |
| setState | Set Current Status | `Dispatch<SetStateAction<T>>` |
