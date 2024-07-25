---
title: isValidVariableName
group:
  title: 布尔
  order: 1
---

# isValidVariableName

判断该字符串能否为变量名

```tsx | pure
import { isValidVariableName } from 'HDesign';

isValidVariableName('_name'); // true
isValidVariableName('name'); // true
isValidVariableName('$name'); // true
isValidVariableName('1name'); // false 不能数字开头
isValidVariableName('class'); // false 关键字、保留字
```
