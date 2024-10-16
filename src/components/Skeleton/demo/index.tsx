import { Skeleton } from 'HDesign';
import React from 'react';

const Index: React.FC = (props) => {
  const {} = props;

  return (
    <div>
      <Skeleton width={400} />
      <Skeleton className="mt-24" width={100} />
    </div>
  );
};
export default Index;
