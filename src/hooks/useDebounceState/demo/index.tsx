import { useDebounceState } from 'HDesign';
import React from 'react';

const Index = () => {
  const [count, setDebounceCount, setCount] = useDebounceState<number>(0, 1000);

  return (
    <div className="flex items-center gap-4">
      <button type="button" onClick={() => setDebounceCount((v) => v + 1)}>
        +1 防抖
      </button>

      <button type="button" onClick={() => setCount((v) => v + 1)}>
        +1 不防抖
      </button>

      <span>count: {count}</span>
    </div>
  );
};
export default Index;
