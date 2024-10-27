import React from 'react';
import {TouchableHighlight, Text, View} from '../../Polyfills';
import {ButtonProps} from './types';

const Button = ({
  onPress,
  title,
  disabled,
}: ButtonProps) => {
  return (
    <View>
      <TouchableHighlight
        disabled={disabled}
        onPress={onPress}
        underlayColor="transparent">
        <Text>{title}</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Button;
