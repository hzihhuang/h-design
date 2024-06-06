import { ScrollContainer } from 'HDesign';
import React from 'react';

const Index: React.FC = () => {
  return (
    <ScrollContainer
      style={{ width: 400, height: 400 }}
      thumbOptions={{
        gap: 2,
        size: 10,
        background: 'green',
      }}
      hoverThumbOptions={{
        size: 12,
        gap: 1,
        background: 'orange',
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
