import { useResize } from 'HDesign';
import React, { useRef } from 'react';

const Index: React.FC = () => {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);

  const UnResizeBox1 = useResize((e) => {
    const { width, height } = e.contentRect;
    console.log('我是第一个盒子', width, height);
  }, box1);
  const UnResizeBox2 = useResize((e) => {
    const { width, height } = e.contentRect;
    console.log('我是第二个盒子', width, height);
  }, box2);

  return (
    <div className="flex gap-4">
      <div
        className="flex items-center justify-center rounded-xl border h-48 w-48 resize overflow-hidden bg-slate-500"
        ref={box1}
      >
        <button
          className="border rounded-lg px-2 py-1 hover:bg-slate-400 active:bg-slate-300 transition-all"
          type="button"
          onClick={UnResizeBox1}
        >
          关闭resize事件
        </button>
      </div>
      <div
        className="flex items-center justify-center rounded-xl border h-48 w-48 resize overflow-hidden bg-slate-700"
        ref={box2}
      >
        <button
          className="border rounded-lg px-2 py-1 hover:bg-slate-600 active:bg-slate-500 transition-all"
          type="button"
          onClick={UnResizeBox2}
        >
          关闭resize事件
        </button>
      </div>
    </div>
  );
};
export default Index;
