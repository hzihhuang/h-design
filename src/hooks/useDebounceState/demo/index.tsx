import { useDebounceState } from 'HDesign';
import React from 'react';

const Index = () => {
  const [count, setCount] = useDebounceState<number>(0, 1000);
  const handleChange = () => setCount((c) => c + 1);

  return (
    <div className="flex items-center gap-4">
      <button
        className="border px-2 py-1 rounded-lg hover:bg-slate-200 active:bg-slate-300 transition-all"
        type="button"
        onClick={handleChange}
      >
        +1
      </button>
      <span>count: {count}</span>
    </div>
  );
};
export default Index;
