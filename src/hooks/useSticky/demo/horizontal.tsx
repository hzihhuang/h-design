import { useSticky } from 'HDesign';
import React from 'react';

const Index: React.FC = () => {
  const { stickyElement } = useSticky({ left: 20, direction: 'horizontal' });
  return (
    <div className="flex gap-4 h-80 w-full bg-slate-500 overflow-auto">
      <div className="w-full flex-shrink-0" style={{ width: 200 }}></div>
      <div
        className="w-40 h-40 bg-slate-200 flex-shrink-0"
        ref={stickyElement}
      ></div>
      <div className="w-full flex-shrink-0" style={{ width: 1800 }}></div>
    </div>
  );
};
export default Index;
