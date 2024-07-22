---
title: useResize
group:
  title: element
  order: 4
order: 1
---

# useResize

Allows you to subscribe to changes in the size of the element.

## Example

Try dragging the bottom right corner of the grid to change the element’s size. You can open the controller to view the page print console.

<code src="./demo/index.tsx"></code>

## Params

| Param    | Description                                                | Type                               | Default |
| -------- | ---------------------------------------------------------- | ---------------------------------- | ------- |
| callback | The callback function triggered by changes in element size | `(e: ResizeObserverEntry) => void` | -       |
| target   | The subscribed element                                     | `Element`                          | -       |
| options  | The options of the ResizeObserver                          | `ResizeObserverOptions`            | -       |

## Result

| Param     | Description                  | Type         |
| --------- | ---------------------------- | ------------ |
| unobserve | The function to unsubscribe. | `() => void` |
