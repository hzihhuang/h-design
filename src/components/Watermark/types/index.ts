export interface WatermarkFont {
  /**
   * @description 颜色
   * @property {string}
   * @default #000
   */
  color?: string | CanvasGradient | CanvasPattern;
  /**
   * @description 大小
   * @property {number}
   * @default 16
   */
  fontSize?: number;
  /**
   * @description 粗细
   * @property {('normal' | 'light' | 'weight' | number)}
   * @default normal
   */
  fontWeight: 'normal' | 'light' | 'weight' | number;
  /**
   * @description 字体
   * @property {string}
   * @default sans-serif
   */
  fontFamily: string;
  /**
   * @description 样式
   * @property {('none' | 'normal' | 'italic' | 'oblique')}
   * @default none
   */
  fontStyle: 'none' | 'normal' | 'italic' | 'oblique';
  /**
   * @description 对齐方式
   * @property {('left' | 'right' | 'center' | 'start' | 'end')}
   * @default center
   */
  textAlign: CanvasTextAlign;
  /**
   * @description 基线
   * @property {('top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom')}
   * @default middle
   */
  textBaseline: CanvasTextBaseline;
}

export interface WatermarkProps {
  /**
   * @description 宽度
   * @property {number}
   * @default 120
   */
  width?: number;
  /**
   * @description 高度
   * @property {number}
   * @default 64
   */
  height?: number;
  /**
   * @description 旋转角度
   * @property {number}
   * @default -22
   */
  rotate?: number;
  /**
   * @description 图片
   * @property {string}
   */
  image?: string;
  /**
   * @description 内容
   * @property {string | string[]}
   */
  content?: string | string[];
  /**
   * @description 字体
   * @property {WatermarkFont}
   */
  font?: WatermarkFont;
  /**
   * @description 间距
   * @property {[number, number]}
   * @default [100, 100]
   */
  gap?: number[];
  /**
   * @description 偏移
   * @property {[number, number]}
   * @default [50, 50]
   */
  offset?: number[];
  /**
   * @description 层级
   * @property {number}
   * @default 10
   */
  zIndex?: number;
  children?: React.ReactNode;
}
