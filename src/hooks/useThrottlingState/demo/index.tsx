import { useThrottlingState } from 'HDesign';
import React from 'react';

const Index = () => {
  const [count, setThrottlingCount, setCount] = useThrottlingState<number>(
    0,
    1000,
  );

  return (
    <div className="flex items-center gap-4">
      <button type="button" onClick={() => setThrottlingCount((v) => v + 1)}>
        +1 节流
      </button>
      <button type="button" onClick={() => setCount((v) => v + 1)}>
        +1 不节流
      </button>
      <span>count: {count}</span>
    </div>
  );
};
export default Index;
