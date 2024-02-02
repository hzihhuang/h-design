---
title: isObjectString
group:
  title: boolean
  order: 1
order: 2
---

# isObjectString

Determine if the string is an object

```tsx | pure
import { isObjectString } from 'HDesign';

isObjectString('{}'); // true
isObjectString('{"key": "value"}'); // true
isObjectString('{key: "value"}'); // false
isObjectString('[1, 2, 3]'); // false
isObjectString('{}}'); // false
```
