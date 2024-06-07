import { SimpleImg } from 'HDesign';
import React from 'react';

const Index: React.FC = (props) => {
  const {} = props;

  return (
    <div className="flex flex-col gap-8 items-center h-52 overflow-auto">
      {Array.from({ length: 20 }).map((_, idx) => (
        <SimpleImg
          className="w-40 h-40 rounded-xl shrink-0"
          src={`https://picsum.photos/1000?random=${idx}`}
          key={idx}
        />
      ))}
    </div>
  );
};
export default Index;
