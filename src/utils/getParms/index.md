---
title: getParms
group:
  title: url
  order: 2
order: 2
---

# getParms

获取查询参数对象

```tsx ｜ pure
import { getParms } from 'HDesign';

getParms(); // 为传递参数，默认 url = window.location.href

getParms('http://www.baidu.com'); // {}
getParms("http://www.baidu.com?name='hzh'"); // { name: "hzh" }
getParms('http://www.baidu.com?name=hzh'); // { name: "hzh" }
getParms('http://www.baidu.com?name=hzh&age=18'); // { name: "hzh", age: 18 }
getParms('http://www.baidu.com?name=hzh&age="18"'); // { name: "hzh", age: "18" }

getParms('?name=hzh&age=18&sex=男&sex=女'); // { name: 'hzh', age: 18, sex: ['男', '女']}
getParms('name=hzh&age=18&sex=男&sex=女'); // 错误，不是查询参数
```
