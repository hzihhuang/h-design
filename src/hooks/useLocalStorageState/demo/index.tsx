import { useLocalStorageState } from 'HDesign';
import React from 'react';

const Index = () => {
  const [{ key1, key2, key3 }, dispatchStorage] = useLocalStorageState(['key1', 'key2', 'key3'] as const);
  return (
    <div className="">
      <div className="flex items-center gap-4">
        <div>{key1}</div>
        <div>{key2}</div>
        <div>{key3}</div>
      </div>
      <div>
        <input className="border" value={key1} type="text" onChange={(e) => dispatchStorage('key1', e.target.value)} />
        <input className="border" value={key2} type="text" onChange={(e) => dispatchStorage('key2', e.target.value)} />
        <input className="border" value={key3} type="text" onChange={(e) => dispatchStorage('key3', e.target.value)} />
      </div>
    </div>
  );
};
export default Index;
