---
title: useThrottle
group:
  title: function
  order: 2
order: 2
---

# useThrottle

A hook that throttles the execution of a function.

```tsx | pure
import { useThrottle } from 'HDesign';

function Demo() {
  // Throttle the execution of the function to 1 second
  const handlerClick = useThrottle(() => console.log('click'), 1000, []);

  return (
    <div>
      <button onClick={handlerClick}>click</button>
    </div>
  );
}
```
