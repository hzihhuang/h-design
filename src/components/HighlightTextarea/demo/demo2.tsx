import { HighlightTextarea } from 'HDesign';
import React from 'react';

const Index: React.FC = () => {
  return (
    <HighlightTextarea
      className="border w-56 h-40"
      value="hello react, hello dumi"
      highlight={['react', 'dumi']}
      formatHighlight={(text) => {
        if (text === 'react') {
          return (
            <span
              className="text-red-500 cursor-pointer"
              onClick={() => alert('点击了react')}
            >
              {text}
            </span>
          );
        }
        return (
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => alert('点击了 dumi')}
          >
            {text}
          </span>
        );
      }}
    />
  );
};
export default Index;
