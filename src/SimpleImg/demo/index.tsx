import { SimpleImg } from 'HDesign';
import React from 'react';

const Index: React.FC = (props) => {
  const {} = props;

  return (
    <div className="flex gap-8 items-center">
      <SimpleImg
        className="w-40 h-40 rounded-xl"
        loadingClassName="bg-slate-600"
        src="https://theme.b5b6.com/zb_users/upload/2023/05/20230523124149168481690977350.jpg"
      />
    </div>
  );
};
export default Index;
