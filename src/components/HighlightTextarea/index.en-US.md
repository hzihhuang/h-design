---
title: HighlightTextarea
group:
  title: micro
  order: 2
---

# HighlightTextarea

On the basis of textarea, the function of recognizing highlighted text has been added

## CASE

<code src="./demo/index.tsx" description="In this case, the default highlighting style was used to highlight the text react and dummy">Base</code>

<code src="./demo/demo2.tsx" description="In this case, different colors of highlight were applied to the text react and dumi, and advanced features such as custom events can also be customized for them">Senior</code>

## API

| Properties      | Description                     | type                                 | Default |
| --------------- | ------------------------------- | ------------------------------------ | ------- |
| className       | class                           | `string`                             | `''`    |
| style           | style                           | `CSSProperties`                      |         |
| value           | text                            | ` string``(v: string) => ReactNode ` | `''`    |
| highlight       | Highlight Text                  | `string[]`                           | `[]`    |
| formatHighlight | Format Highlighted Text         | `(v: string) => ReactNode`           |         |
| ref             | Methods for exposing components | `HighlightTextareaRef`               |         |
