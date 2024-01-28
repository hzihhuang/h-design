import { Sidebar } from 'HDesign';
import React, { useRef } from 'react';

const Index: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div
        className="relative border w-full border-cyan-600 z-0"
        style={{ height: 500 }}
        ref={boxRef}
      ></div>

      <Sidebar placement="left" alignment="start" target={boxRef}>
        <div className="w-12 h-12 rounded bg-slate-200 flex items-center justify-center">
          左上
        </div>
      </Sidebar>
      <Sidebar placement="left" alignment="center" target={boxRef}>
        <div className="w-12 h-12 rounded bg-slate-200 flex items-center justify-center">
          左中
        </div>
      </Sidebar>
      <Sidebar placement="left" alignment="end" target={boxRef}>
        <div className="w-12 h-12 rounded bg-slate-200 flex items-center justify-center">
          左下
        </div>
      </Sidebar>

      <Sidebar placement="right" alignment="start" target={boxRef}>
        <div className="w-12 h-12 rounded bg-slate-200 flex items-center justify-center">
          右上
        </div>
      </Sidebar>
      <Sidebar placement="right" alignment="center" target={boxRef}>
        <div className="w-12 h-12 rounded bg-slate-200 flex items-center justify-center">
          右中
        </div>
      </Sidebar>
      <Sidebar placement="right" alignment="end" target={boxRef}>
        <div className="w-12 h-12 rounded bg-slate-200 flex items-center justify-center">
          右下
        </div>
      </Sidebar>
    </>
  );
};
export default Index;
