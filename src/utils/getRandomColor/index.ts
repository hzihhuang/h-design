export type RandomColorType = 'hex' | 'rgb' | 'hsl' | 'hsv';

/**
 * 获取查询参数对象的某一项
 * @param colorType
 * @returns color
 */
function getRandomColor(colorType: RandomColorType = 'hex') {
  const randomInt = (num: number = 255) => Math.floor(Math.random() * num);
  const randomHue = () => randomInt(360);
  const randomPercentage = () => `${randomInt(100)}%`;
  switch (colorType) {
    case 'hex':
      return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')}`;
    case 'rgb':
      return `rgb(${randomInt()},${randomInt()}, ${randomInt()})`;
    case 'hsl':
      return `hsl(${randomHue()},${randomPercentage()}%, ${randomPercentage()}%)`;
    case 'hsv':
      return `hsv(${randomHue()},${randomPercentage()}%, ${randomPercentage()}%)`;
    default:
      return '#000000'; // 默认返回黑色
  }
}

export default getRandomColor;
