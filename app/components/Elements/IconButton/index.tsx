import React from 'react';
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
  Text,
  View,
} from '../../Polyfills';
import {Icon} from '../Icon';
import {IconButtonProps} from './types';

const IconButton = ({
  onPress,
  iconSize,
  iconColor,
  iconName,
  className,
  disabled,
}: IconButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled} className={className}>
      <View>
        <Icon
          name={iconName}
          size={iconSize}
          color={iconColor}
        />
        <TouchableHighlight
          onPress={onPress}>
          <Text>.</Text>
        </TouchableHighlight>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default IconButton;
