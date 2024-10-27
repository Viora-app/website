import React from 'react';
import {TextInput, View, Text} from '../../Polyfills';

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
    <View>
      <Text>{placeholder}</Text>
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
