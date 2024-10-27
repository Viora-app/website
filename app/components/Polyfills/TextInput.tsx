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
      type={keyboardType}
      onChange={onChange}
      {...(rest || {})}
    />
  );
}

export default TextInput;
