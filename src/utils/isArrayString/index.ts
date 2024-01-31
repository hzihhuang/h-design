/**
 * @description 判断一个字符串是否为数组字符串
 * @param string
 * @returns boolean
 */
export default function isArrayString(str: string) {
  // 检查是否以`[`开始，以`]`结束
  if (!str.match(/^\[.*\]$/)) {
    return false;
  }
  // 尝试解析JSON，如果解析失败，则不是合法的数组字符串
  try {
    const parsed = JSON.parse(str);
    // 检查解析后的对象是否为数组
    if (!Array.isArray(parsed)) {
      return false;
    }
    // 检查数组中的每个元素是否都是合法的JSON值
    return parsed.every((element) => {
      return (
        typeof element === 'string' ||
        typeof element === 'number' ||
        typeof element === 'boolean' ||
        element === null ||
        Array.isArray(element) ||
        (typeof element === 'object' &&
          element !== null &&
          !Array.isArray(element))
      );
    });
  } catch (e) {
    // 解析失败，不是合法的数组字符串
    return false;
  }
}
