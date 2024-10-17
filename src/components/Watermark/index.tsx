import React, { ReactNode } from 'react';
import './index.scss';

export interface WatermarkProps {
  /** 水印文案 */
  text?: string;
  children?: ReactNode;
}

const Watermark: React.FC<WatermarkProps> = ({ children, text = 'watermark' }) => {
  return (
    <div className="watermark">
      {children}
      {text}
    </div>
  );
};

export default Watermark;
