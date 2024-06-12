---
title: useDebounce
group:
  title: function
  order: 2
order: 1
---

# useDebounce

A hook that debounce the execution of a function.

```tsx | pure
import { useDebounce } from 'HDesign';

function Demo() {
  // Anti shake function, executed only once within 1 second
  const handlerClick = useDebounce(() => console.log('click'), 1000, []);

  return (
    <div>
      <button onClick={handlerClick}>click</button>
    </div>
  );
}
```
