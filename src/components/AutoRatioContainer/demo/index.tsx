import { AutoRatioContainer } from 'HDesign';
import React, { useState } from 'react';

const Demo = () => {
  const [padding, setPadding] = useState(32);
  const [ratio, setRatio] = useState(500 / 200);
  const [radius, setRadius] = useState(16);

  const handlerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    set(Number(e.target.value));
  };
  return (
    <div className="flex flex-col gap-6" style={{ height: 500 }}>
      <div className="flex gap-4">
        <div className="flex gap-2">
          <span>内边距: </span>
          <input
            className="border rounded-md w-12"
            type="number"
            value={padding}
            onChange={(e) => handlerChange(e, setPadding)}
          />
        </div>
        <div className="flex gap-2">
          <span>圆角: </span>
          <input
            className="border rounded-md w-12"
            type="number"
            value={radius}
            onChange={(e) => handlerChange(e, setRadius)}
          />
        </div>
        <div className="flex gap-2">
          <span>比例: </span>
          <input
            className="border rounded-md w-12"
            type="number"
            value={ratio}
            onChange={(e) => handlerChange(e, setRatio)}
          />
        </div>
      </div>
      <AutoRatioContainer
        className="bg-slate-400 resize"
        boxClassName="overflow-hidden"
        style={{ padding }}
        ratio={ratio}
        boxStyle={{ borderRadius: radius }}
      >
        <img
          className="w-full h-full block"
          src="https://picsum.photos/500/200"
        />
      </AutoRatioContainer>
    </div>
  );
};

export default Demo;
