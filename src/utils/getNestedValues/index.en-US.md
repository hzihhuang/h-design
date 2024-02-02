---
title: getNestedValues
group:
  title: value
  order: 3
order: 1
---

# getNestedValues

Get deep attribute values of objects

```tsx ｜ pure
import { getNestedValues } from 'HDesign';

getNestedValues({ a: { b: { c: 1 } } }, ['a', 'b', 'c']); // 1
getNestedValues({ a: { b: { c: 1 } } }, ['a', 'b', 'd']); // undefined
getNestedValues({ a: { b: { c: 1 } } }, ['a', 'b', 'c', 'd']); // undefined
getNestedValues({ a: { b: { c: 1 } } }, ['a', 'b', 'c', 'd'], 'default'); // default
getNestedValues({ a: { b: { c: 1 } } }, ['a', 'b']); // { c: 1 }
```
