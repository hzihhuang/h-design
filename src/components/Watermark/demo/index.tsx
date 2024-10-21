import { Watermark } from 'HDesign';
import React from 'react';

const Index: React.FC = () => {
  return (
    <Watermark content="你好你好你好">
      <div style={{ height: 300, width: '100%' }}></div>
    </Watermark>
  );
};
export default Index;
