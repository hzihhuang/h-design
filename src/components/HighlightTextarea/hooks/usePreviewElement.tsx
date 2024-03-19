import React, { ReactNode, useMemo } from 'react';

const DEFAULT_ARR: any[] = [];

export interface previewElementOptions {
  /** 当前值 */
  value?: string;
  /** 高亮文案 */
  highlight?: string[];
  /**
   * 格式化高亮文案
   * @description 可以自定义添加标签包裹，增加文案事件颜色等，但是请不要使用 margin、padding 等影响布局的样式
   */
  formatHighlight?: (val: string) => ReactNode;
}
function usePreviewElement({
  value = '',
  highlight = DEFAULT_ARR,
  formatHighlight,
}: previewElementOptions) {
  const showValueList = useMemo(() => {
    const result: { type: string; msg: string }[] = [];
    [...value].reduce(
      (obj: any, item: string) => {
        obj.str = obj.str + item;
        result[obj.idx] = {
          type: obj.type,
          msg: obj.str,
        };
        /** 切换其他类型 */
        const switchType = highlight.some((item) => {
          if (!obj.str.includes(item)) return false;
          obj.type = item;
          return true;
        });
        if (switchType) {
          result[obj.idx].msg = obj.str.split(obj.type)[0];
          result.push({
            type: obj.type,
            msg: obj.type,
          });
          obj.idx = obj.idx + 2;
          obj.str = '';
          obj.type = 'default';
        }
        return obj;
      },
      {
        str: '',
        idx: 0,
        type: 'default',
      },
    );

    return result;
  }, [value, highlight]);

  return showValueList.map((item, idx) => {
    if (item.type === 'default') return item.msg;
    if (formatHighlight) return formatHighlight(item.msg);
    return (
      <span style={{ color: 'blue' }} key={item.msg + idx}>
        {item.msg}
      </span>
    );
  });
}

export default usePreviewElement;
