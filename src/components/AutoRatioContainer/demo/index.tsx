import { AutoRatioContainer } from 'HDesign';
import React from 'react';

const Demo = () => (
  <AutoRatioContainer
    className="bg-slate-400 resize"
    style={{ padding: 32 }}
    boxClassName="overflow-hidden"
    boxStyle={{ borderRadius: 12 }}
    ratio={16 / 9}
  >
    <img className="w-full h-full block" src="https://picsum.photos/500/200" />
  </AutoRatioContainer>
);

export default Demo;
