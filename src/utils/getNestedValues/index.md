---
title: getNestedValues
group:
  title: 值
  order: 3
order: 1
---

# getNestedValues

获取对象深层属性值

```tsx ｜ pure
import { getNestedValues } from 'HDesign';

getNestedValues({ a: { b: { c: 1 } } }, ['a', 'b', 'c']); // 1
getNestedValues({ a: { b: { c: 1 } } }, ['a', 'b', 'd']); // undefined
getNestedValues({ a: { b: { c: 1 } } }, ['a', 'b', 'c', 'd']); // undefined
getNestedValues({ a: { b: { c: 1 } } }, ['a', 'b', 'c', 'd'], 'default'); // default
getNestedValues({ a: { b: { c: 1 } } }, ['a', 'b']); // { c: 1 }
```
