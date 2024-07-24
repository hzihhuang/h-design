---
title: HighlightTextarea
group:
  title: 微组件
  order: 2
order: 2
---

# HighlightTextarea

在 textarea 的基础上，增加了识别高亮文本的功能

## 案例

<code src="./demo/index.tsx" description="在这个案例中，使用的默认的高亮样式，对 react、dumi 两个文字进行高亮">基础</code>

<code src="./demo/demo2.tsx" description="在这个案例中，分别对react、dumi 两个文字进行了不同颜色的高亮，还可以为其自定义事件等高级功能">高级</code>

## API

| 属性            | 描述                 | 类型                                 | 默认值 |
| --------------- | -------------------- | ------------------------------------ | ------ |
| className       | 类                   | `string`                             | `''`   |
| style           | 内联样式             | `CSSProperties`                      |        |
| value           | 当前值格式化高亮文案 | ` string``(v: string) => ReactNode ` | `''`   |
| highlight       | 高亮文案             | `string[]`                           | `[]`   |
| formatHighlight | 格式化高亮文案       | `(v: string) => ReactNode`           |        |
| ref             | 组件暴露出来的方法   | `HighlightTextareaRef`               |        |
