import { Watermark } from 'HDesign';
import React from 'react';

const Index: React.FC = () => {
  return (
    <Watermark content="Watermark">
      <div style={{ height: 300, width: '100%' }}></div>
    </Watermark>
  );
};
export default Index;
