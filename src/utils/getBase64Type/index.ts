/**
 *
 * @param base64String base64字符串
 * @returns 类型
 */
function getBase64ImageType(base64String: string) {
  // 检查字符串是否以'data:image/'开头
  if (!base64String.startsWith('data:image/')) {
    return 'Invalid base64 string';
  }

  // 提取MIME类型
  const mimeType = base64String.substring(
    base64String.indexOf('image/') + 6,
    base64String.indexOf(';'),
  );

  switch (mimeType) {
    case 'svg+xml':
      return 'svg';
    case 'x-icon':
      return 'ico';
    case 'vnd.microsoft.icon':
      return 'ico';
    default:
      return mimeType;
  }
}

export default getBase64ImageType;
