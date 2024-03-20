import { HighlightTextarea } from 'HDesign';
import React from 'react';

const Index: React.FC = () => {
  return (
    <HighlightTextarea
      className="border w-56 h-40"
      value="hello react, hello dumi"
      highlight={['react', 'dumi']}
    />
  );
};
export default Index;
