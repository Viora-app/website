import React from 'react';
import {TextInput, View, Text} from 'react-native';

import {colors} from '../../../config/stylesGuides';
import {useTheme} from '../../../hooks/useTheme';
import {usePresets} from '../../../hooks/usePresets';
import type {InputProps} from './types';
import themedStyles from './styles';

const Input = ({
  style,
  value,
  onChange,
  name,
  placeholder,
  inputMode = 'text',
  multiline = false,
}: InputProps) => {
  const styles = useTheme(themedStyles);
  const {presets} = usePresets();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{placeholder}</Text>
      <TextInput
        style={[styles.input, style]}
        onChangeText={onChange(name)}
        value={value}
        multiline={multiline}
        placeholderTextColor={colors[presets.theme].neutralStrong}
        inputMode={inputMode}
      />
    </View>
  );
};

export default Input;
