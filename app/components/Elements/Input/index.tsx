import React from 'react';
import {TextInput, View, Span} from '../../Polyfills';

import type {InputProps} from './types';

const Input = ({
  value,
  onChange,
  name,
  placeholder,
  inputMode = 'text',
  multiline = false,
}: InputProps) => {
  return (
    <View className="w-full">
      <Span>{placeholder}</Span>
      <TextInput
        onChangeText={onChange(name)}
        value={value}
        multiline={multiline}
        placeholderTextColor="#ccc"
        inputMode={inputMode}
      />
    </View>
  );
};

export default Input;
