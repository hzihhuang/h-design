import { useMutation } from 'HDesign';
import React, { useRef, useState } from 'react';

const Index: React.FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');

  // 使用 useMutation 钩子来观察 'data-my-attribute' 属性的变化
  useMutation(
    (mutationRecord) => {
      const target = mutationRecord.target as HTMLDivElement;
      setValue(target.getAttribute('data-my-attribute') || '');
      console.log(mutationRecord.attributeName, mutationRecord.oldValue);
    },
    elementRef,
    {
      attributes: true,
      attributeOldValue: true,
    },
  );
  const changeAttribute = () => {
    const newAttributeValue = 'new-value-' + new Date().getTime();
    if (elementRef.current) {
      elementRef.current.setAttribute('data-my-attribute', newAttributeValue);
    }
  };

  return (
    <div>
      <button type="button" onClick={changeAttribute}>
        点击获取最新值
      </button>

      <p ref={elementRef} data-my-attribute="initial-value">
        属性“data my Attribute”值：{value}
      </p>
    </div>
  );
};
export default Index;
