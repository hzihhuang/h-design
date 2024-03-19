import { HighlightTextarea } from 'HDesign';
import React, { useState } from 'react';

const Index: React.FC = (props) => {
  const {} = props;

  const [value, setValue] = useState('你好 react, 你好 dumi');

  return (
    <div className="flex gap-8 items-center">
      <HighlightTextarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        highlight={['react', 'dumi']}
      />
    </div>
  );
};
export default Index;
