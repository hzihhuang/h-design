---
title: useSticky
group:
  title: element
  order: 4
order: 2
---

# useSticky

This method allows elements to be pinned to a certain position on the page without being affected by scrolling. similar to **position: sticky** in CSS.

## Example

<code src="./demo/vertical.tsx" description="Only handling the Y-axis scrolling is also the default behavior">Vertical</code>

<code src="./demo/horizontal.tsx" description="Only X-axis rolling has been processed, and direction configuration control is required">Horizontal</code>

<code src="./demo/both.tsx" description="Simultaneously handling the rolling of the X and Y axes requires the use of direction configuration control, which is not recommended and may result in unnecessary calculations">Both</code>

## options

| Param     | Description                              | Type                             | Default    |
| --------- | ---------------------------------------- | -------------------------------- | ---------- |
| top       | How far from the `top` to start fixing   | `number`                         | `0`        |
| left      | How far from `left` does it start to fix | `number`                         | `0`        |
| direction | Need to calculate a fixed direction      | `horizontal`、`vertical`、`both` | `vertical` |

## Result

| Param         | Description                              | Type                              | Default                                                          |
| ------------- | ---------------------------------------- | --------------------------------- | ---------------------------------------------------------------- |
| stickyElement | Specify that fixed elements are required | `React.RefObject<HTMLDivElement>` | `-`                                                              |
| scrollElement | Specify parent element with scroll bar   | `React.RefObject<HTMLDivElement>` | `Automatically find the nearest parent element with a scrollbar` |
