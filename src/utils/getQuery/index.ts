import getParms from '../getParms';

/**
 * 获取查询参数对象的某一项
 * @param key 键
 * @param url 地址
 * @returns value
 */
function getQuery(key: string, url?: string) {
  return getParms(url)[key];
}

export default getQuery;
