import { Skeleton } from 'HDesign';
import React from 'react';

const Index: React.FC = (props) => {
  const {} = props;

  return (
    <div className="flex gap-8 items-center">
      <Skeleton width={100} height={100} radius={999} />
      <div className="flex flex-col gap-2">
        <Skeleton width={200} height={24} radius={4} />
        <Skeleton width={160} height={24} radius={4} />
        <Skeleton width={240} height={24} radius={4} />
      </div>
    </div>
  );
};
export default Index;
