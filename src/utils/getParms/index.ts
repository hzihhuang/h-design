import isArrayString from '../isArrayString';
import isObjectString from '../isObjectString';

// 格式化
const format = (st: string) => {
  const curStr = st.trim();

  switch (true) {
    case isArrayString(curStr):
    case isObjectString(curStr):
      return JSON.parse(curStr);
    case /^[0-9]+$/.test(curStr):
      return Number(curStr);
    case /^".*"$/.test(curStr):
    case /^'.*'$/.test(curStr):
      return curStr.slice(1, -1);
    default:
      return curStr;
  }
};

function getParms(url?: string) {
  let curUrl = url ?? window.location.href;
  if (curUrl[0] === '?') {
    curUrl = `https://www.baidu.com/asd${curUrl}`;
  }
  // 创建一个URL对象
  const urlObj = new URL(curUrl);
  // 获取查询参数
  const params = urlObj.searchParams;
  const parmsObj: { [key: string]: any } = {};

  // 遍历所有查询参数
  for (const [key, value] of params) {
    if (parmsObj.hasOwnProperty(key)) {
      // 如果参数名已经存在，则转换为数组（处理多个同名参数）
      if (!Array.isArray(parmsObj[key])) {
        parmsObj[key] = [parmsObj[key]];
      }
      parmsObj[key].push(format(value));
    } else {
      // 否则，直接添加到对象中
      parmsObj[key] = format(value);
    }
  }

  return parmsObj;
}

export default getParms;
