import { ScrollContainer } from 'HDesign';
import React from 'react';

const Index: React.FC = () => {
  return (
    <ScrollContainer
      style={{
        width: 400,
        height: 400,
      }}
      thumbOptions={{
        gap: 2,
        size: 10,
        background:
          'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%), #0093e9',
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
