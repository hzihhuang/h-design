export interface WatermarkFont {
  /**
   * @description 字体颜色
   * @property {string}
   * @default #000
   */
  color?: string;
  /**
   * @description 字体大小
   * @property {number}
   * @default 16
   */
  fontSize?: number;
  /**
   * @description 字体粗细
   * @property {('normal' | 'light' | 'weight' | number)}
   * @default normal
   */
  fontWeight: 'normal' | 'light' | 'weight' | number;
  /**
   * @description 字体样式
   * @property {string}
   * @default sans-serif
   */
  fontFamily: string;
  /**
   * @description 字体样式
   * @property {('none' | 'normal' | 'italic' | 'oblique')}
   * @default none
   */
  fontStyle: 'none' | 'normal' | 'italic' | 'oblique';
  /**
   * @description 文字对齐方式
   * @property {('left' | 'right' | 'center' | 'start' | 'end')}
   * @default center
   */
  textAlign: 'left' | 'right' | 'center' | 'start' | 'end';
  /**
   * @description 文字基线
   * @property {('top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom')}
   * @default middle
   */
  textBaseline: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
}

export interface WatermarkProps {
  /**
   * @description 水印宽度
   * @property {number}
   * @default 120
   */
  width?: number;
  /**
   * @description 水印高度
   * @property {number}
   * @default 64
   */
  height?: number;
  /**
   * @description 水印旋转角度
   * @property {number}
   * @default -22
   */
  rotate?: number;
  /**
   * @description 水印图片
   * @property {string}
   * @default undefined
   */
  image?: string;
  /**
   * @description 水印内容
   * @property {string | string[]}
   * @default undefined
   */
  content?: string | string[];
  /**
   * @description 水印字体
   * @property {WatermarkFont}
   * @default undefined
   */
  font?: WatermarkFont;
  /**
   * @description 水印间距
   * @property {[number, number]}
   * @default [100, 100]
   */
  gap?: [number, number];
  /**
   * @description 水印偏移
   * @property {[number, number]}
   * @default [50, 50]
   */
  offset?: [number, number];
  /**
   * @description 水印层级
   * @property {number}
   * @default 10
   */
  zIndex?: number;
  children?: React.ReactNode;
}
