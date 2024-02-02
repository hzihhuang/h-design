/**
 *
 * @description 获取对象深层属性值
 * @param obj 取值对象
 * @param propertyPaths 属性名数组
 * @param defaultValue 未找到或者找到的值为 undefined 的时候使用默认值
 * @returns 值
 */
function getNestedValues(
  obj: { [key: string]: any },
  propertyPaths: string[],
  defaultValue?: any,
) {
  let current: any = obj;
  propertyPaths.some((path) => {
    if (current && typeof current === 'object') {
      current = current[path];
      return false;
    } else {
      current = undefined;
      return false;
    }
  });
  return current === undefined ? defaultValue : current;
}

export default getNestedValues;
