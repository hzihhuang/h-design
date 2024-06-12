---
title: useDebounce
group:
  title: 函数
  order: 2
order: 1
---

# useDebounce

防抖函数

```tsx | pure
import { useDebounce } from 'HDesign';

function Demo() {
  // 防抖函数，在1秒内只执行一次
  const handlerClick = useDebounce(() => console.log('click'), 1000, []);

  return (
    <div>
      <button onClick={handlerClick}>click</button>
    </div>
  );
}
```
