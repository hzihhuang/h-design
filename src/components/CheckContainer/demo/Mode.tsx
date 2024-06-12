import { CheckContainer } from 'HDesign';
import React from 'react';

const Mode: React.FC = () => {
  const [checked, setChecked] = React.useState(false);
  const mode: any = ['hover', 'checked', 'always'];
  return (
    <div className="flex gap-12">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div className="flex flex-col gap-2" key={idx}>
          <div className="text-center">{mode[idx]}</div>
          <CheckContainer
            checked={checked}
            mode={mode[idx]}
            onClick={setChecked}
          >
            <img
              className="w-40 h-40 rounded-md bg-gray-400"
              src="https://picsum.photos/400"
            />
          </CheckContainer>
        </div>
      ))}
    </div>
  );
};
export default Mode;
