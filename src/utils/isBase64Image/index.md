---
title: isBase64Image
group:
  title: 布尔
  order: 1
---

# isBase64Image

判断该字符是否为 base64 图片字符串

```tsx | pure
import { isBase64Image } from 'HDesign';

isBase64Image('data:image/png;base64,...'); // true
isBase64Image('data:image/jpg;base64,...'); // true
isBase64Image('data:image/gif;base64,...'); // true
isBase64Image('data:image/jpeg;base64,...'); // true
isBase64Image('data:image/svg+xml;base64,...'); // true
isBase64Image('data:image/webp;base64,...'); // true
```
