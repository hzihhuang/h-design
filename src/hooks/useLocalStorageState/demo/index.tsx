import { useLocalStorageState } from 'HDesign';
import React from 'react';

const Index = () => {
  const [{ key1, key2, key3 }, dispatchStorage] = useLocalStorageState(['key1', 'key2', 'key3'] as const);
  return (
    <div className="flex flex-col gap-12">
      <div>
        <div>{key1}</div>
        <input className="border" value={key1} type="text" onChange={(e) => dispatchStorage('key1', e.target.value)} />
      </div>
      <div>
        <div>{key2}</div>
        <input className="border" value={key2} type="text" onChange={(e) => dispatchStorage('key2', e.target.value)} />
      </div>
      <div>
        <div>{key3}</div>
        <input className="border" value={key3} type="text" onChange={(e) => dispatchStorage('key3', e.target.value)} />
      </div>
    </div>
  );
};
export default Index;
