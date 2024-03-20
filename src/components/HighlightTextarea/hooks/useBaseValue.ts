import { useCallback, useEffect, useState } from 'react';

interface BaseValueOptions {
  value: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}
/** 获取value */
function useBaseValue({ value, onChange }: BaseValueOptions) {
  const [currentValue, setValue] = useState<string>(value ?? '');

  const handlerChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) return onChange(e);
      setValue(e.target.value);
    },
    [onChange],
  );

  useEffect(() => setValue(value), [value]);

  return {
    currentValue,
    handlerChange,
  };
}

export default useBaseValue;
