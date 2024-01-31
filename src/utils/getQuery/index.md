---
title: getQuery
group:
  title: url
  order: 2
order: 1
---

# getQuery

获取查询参数对象的某一项

```tsx ｜ pure
import { getQuery } from 'HDesign';

getQuery('name'); // 为传递参数，默认 url = window.location.href

getQuery('name', "http://www.baidu.com?name='hzh'"); // 'hzh'
```
