---
title: useThrottle
group:
  title: 函数
  order: 2
order: 2
---

# useThrottle

节流函数

```tsx | pure
import { useThrottle } from 'HDesign';

function Demo() {
  // 节流函数，在1秒内最多执行一次
  const handlerClick = useThrottle(() => console.log('click'), 1000, []);

  return (
    <div>
      <button onClick={handlerClick}>click</button>
    </div>
  );
}
```
