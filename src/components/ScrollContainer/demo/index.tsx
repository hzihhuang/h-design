import { ScrollContainer } from 'HDesign';
import React from 'react';

const Index: React.FC = () => {
  return (
    <ScrollContainer
      style={{
        width: 400,
        height: 400,
      }}
    >
      <div
        style={{
          width: 1000,
          height: 1000,
          background: 'linear-gradient(to top right, #f1f2b5, #135058)',
        }}
      ></div>
    </ScrollContainer>
  );
};
export default Index;
