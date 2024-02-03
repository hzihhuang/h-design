/**
 *
 * @description 检查是否是有效的Base64图像字符串
 * @param str base64字符串
 * @returns boolean
 */
function isBase64Image(str: string) {
  if (typeof str !== 'string' || str.trim().length === 0) return false;
  const base64ImageRegex =
    /^data:image\/(png|jpeg|gif|bmp|svg\+xml|jpg|webp);base64,(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  return base64ImageRegex.test(str);
}

export default isBase64Image;
