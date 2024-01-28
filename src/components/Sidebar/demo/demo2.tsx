import { Sidebar } from 'HDesign';
import React, { useRef } from 'react';

const Demo2: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div
        className="relative border w-full border-cyan-600 z-0"
        style={{ height: 500 }}
        ref={boxRef}
      ></div>

      <Sidebar
        placement="right"
        alignment="end"
        itemOptions={{ gap: 16 }}
        offset={{ right: 18, bottom: 18 }}
        target={boxRef}
      >
        <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
          工具1
        </div>
        <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
          工具2
        </div>
        <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
          工具3
        </div>
      </Sidebar>

      <Sidebar
        placement="left"
        alignment="end"
        direction="horizontal"
        itemOptions={{ gap: 16 }}
        offset={{ left: 18, bottom: 18 }}
        target={boxRef}
      >
        <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
          工具1
        </div>
        <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
          工具2
        </div>
        <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
          工具3
        </div>
      </Sidebar>
    </>
  );
};
export default Demo2;
