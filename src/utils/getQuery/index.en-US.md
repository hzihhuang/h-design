---
title: getQuery
group:
  title: url
  order: 2
---

# getQuery

get a certain item of the query parameter object

```tsx ｜ pure
import { getQuery } from 'HDesign';

getQuery('name'); // 为传递参数，默认 url = window.location.href

getQuery('name', "http://www.baidu.com?name='hzh'"); // 'hzh'
getQuery('name', 'http://www.baidu.com?name=hzh'); // 'hzh'

getQuery('age', 'http://www.baidu.com?age=18'); // 18
getQuery('age', "http://www.baidu.com?age='18'"); // '18'
getQuery('age', "http://www.baidu.com?age='18'&age=18"); // ['18', 18]
```
