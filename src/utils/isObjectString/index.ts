/**
 * @description 判断一个字符串是否为对象字符串
 * @param string
 * @returns boolean
 */
export default function isObjectString(str: string) {
  // 检查是否以`{`开始，以`}`结束
  if (!str.match(/^\{.*\}$/)) {
    return false;
  }
  // 尝试解析JSON，如果解析失败，则不是合法的对象字符串
  try {
    const parsed = JSON.parse(str);
    // 检查解析后的对象是否为对象，并且不是数组
    return (
      typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
    );
  } catch (e) {
    // 解析失败，不是合法的对象字符串
    return false;
  }
}
