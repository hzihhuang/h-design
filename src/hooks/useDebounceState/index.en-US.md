---
title: useDebounceState
group:
  title: state
  order: 1
order: 1
---

# useDebounceState

debounce State

When fast switching, use `useDebounceState` instead of `useState` to reduce the number of renderings.

## Example

<code src="./demo" description="The example has a debounce time of 1000ms, quickly click `+1` to try it.">Demo</code>

## Params

| Param | Description         | Type     | Default |
| ----- | ------------------- | -------- | ------- |
| value | Initial State Value | `T`      | `-`     |
| delay | debounce time       | `number` | `-`     |

## Result

| Param    | Description        | Type                          |
| -------- | ------------------ | ----------------------------- |
| state    | Current Status     | `T`                           |
| setState | Set Current Status | `Dispatch<SetStateAction<T>>` |
