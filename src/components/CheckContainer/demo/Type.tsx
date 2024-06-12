import { CheckContainer } from 'HDesign';
import React from 'react';

const Type: React.FC = () => {
  const [checked, setChecked] = React.useState(false);
  const type: any = ['default', 'radio', 'checkbox'];
  return (
    <div className="flex gap-12">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div className="flex flex-col gap-2" key={idx}>
          <div className="text-center">{type[idx]}</div>
          <CheckContainer
            checked={checked}
            type={type[idx]}
            mode="always"
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
export default Type;
