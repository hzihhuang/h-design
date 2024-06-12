import { useSticky } from 'HDesign';
import React from 'react';

const Index: React.FC = () => {
  const { stickyElement } = useSticky({ top: 20, left: 20, direction: 'both' });
  return (
    <div className="flex gap-4 h-80 w-full bg-slate-500 overflow-auto flex-col">
      <div
        className="w-full flex-shrink-0"
        style={{ height: 200, width: 2000 }}
      ></div>
      <div
        className="ml-40 w-40 h-40 bg-slate-200 flex-shrink-0"
        ref={stickyElement}
      ></div>
      <div
        className="w-full flex-shrink-0"
        style={{ height: 400, width: 2000 }}
      ></div>
    </div>
  );
};
export default Index;
