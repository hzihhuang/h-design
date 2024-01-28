---
title: useThrottlingState
group:
  title: state
  order: 1
order: 2
---

# useThrottlingState

throttling State

When fast switching, use `useThrottlingState` instead of `useState` to reduce the number of renderings.

## Example

The example has a throttling time of 1000ms, quickly click `+1` to try it.
<code src="./demo"></code>

## Params

| Param | Description         | Type     | Default |
| ----- | ------------------- | -------- | ------- |
| value | Initial State Value | `T`      | -       |
| delay | throttling time     | `number` | -       |

## Result

| Param    | Description        | Type                          |
| -------- | ------------------ | ----------------------------- |
| state    | Current Status     | `T`                           |
| setState | Set Current Status | `Dispatch<SetStateAction<T>>` |
