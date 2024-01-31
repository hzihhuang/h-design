---
title: isArrayString
group:
  title: 布尔
  order: 1
order: 1
---

# isArrayString

判断该字符串是不是一个数组

```tsx | pure
import { isArrayString } from 'HDesign';

isArrayString('[1, 2, 3]'); // true
isArrayString('[]'); // true
isArrayString('[1, "string", [1,2], {"key": "value"}, true, null]'); // true
isArrayString('1, 2, 3'); // false
isArrayString('{1, 2, 3}'); // false
isArrayString('[1, 2, 3'); // false
isArrayString('[1, 2, 3, undefined]'); // false
isArrayString('[1, 2, 3, function(){}]'); // false
```
