---
title: isObjectString
group:
  title: 布尔
  order: 2
order: 1
---

# isObjectString

判断该字符串是不是一个对象

```tsx | pure
import { isObjectString } from 'HDesign';

isObjectString('{}'); // true
isObjectString('{"key": "value"}'); // true
isObjectString('{key: "value"}'); // false
isObjectString('[1, 2, 3]'); // false
isObjectString('{}}'); // false
```
