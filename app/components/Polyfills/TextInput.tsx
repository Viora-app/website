import React, { FC } from 'react';

import { TextInputProps } from './types';

const TextInput: FC<TextInputProps> = ({
  onChangeText,
  keyboardType = 'text',
  ...rest
}) => {
  const onChange = (e) => {
    onChangeText(e.target.value)
  };

  return (
    <input
      className="w-full h-[44px] bg-inputBg text-neutralMighty rounded-md mt-2 mb-4 px-4"
      type={keyboardType}
      onChange={onChange}
      {...(rest || {})}
    />
  );
}

export default TextInput;
