import { chunk } from 'lodash-es';
import getBase64ImageType from '../getBase64Type';

type Options = {
  /** 图片前缀 */
  name?: string;
  /** 图片类型，未填写则由程序自动检测 */
  mimeType?:
    | 'png'
    | 'jpeg'
    | 'webp'
    | 'gif'
    | 'svg'
    | 'jpg'
    | 'tiff'
    | 'eps'
    | 'ico';
  /** 每次下载数量 ( 浏览器最多支持10张 ) */
  chunkSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
};
/**
 * @description 批量下载 base64 图片
 * @param base64 图片地址
 * @param [options={}] 配置项
 */
function downloadBase64Imgs(base64: string[], options: Options = {}) {
  const { name = 'image_', mimeType, chunkSize = 5 } = options;

  let downloadedImages = 1;
  let currentChunkIndex = 0;
  const downloadImage = (base64Image: string) => {
    // 创建一个a标签用于下载
    let a = document.createElement('a');
    a.href = base64Image;
    a.download = `${name}${downloadedImages}.${
      mimeType ?? getBase64ImageType(base64Image)
    }`; // 设置下载的文件名
    document.body.appendChild(a); // 添加a标签到body中
    a.click(); // 模拟点击下载
    document.body.removeChild(a); // 移除a标签
    downloadedImages++; // 增加下载图片的数量
  };
  const newBase64 = chunk(base64, chunkSize);
  const timer = setInterval(() => {
    newBase64[currentChunkIndex].forEach(downloadImage);
    currentChunkIndex += 1;
    if (currentChunkIndex > newBase64.length - 1) {
      clearInterval(timer);
    }
  }, 1000);
}

export default downloadBase64Imgs;
