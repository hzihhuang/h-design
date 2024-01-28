import { SimpleImg } from 'HDesign';
import React from 'react';

const Index: React.FC = (props) => {
  const {} = props;

  return (
    <div className="flex gap-8 items-center">
      <SimpleImg
        className="w-40 h-40 rounded-xl"
        loadingClassName="bg-slate-600"
        src="https://images.pexels.com/photos/19601923/pexels-photo-19601923.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />
    </div>
  );
};
export default Index;
