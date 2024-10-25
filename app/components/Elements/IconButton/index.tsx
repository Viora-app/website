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
  style,
  iconSize,
  iconColor,
  iconName,
  disabled,
}: IconButtonProps) => {
  const styles = {};
  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
      <View style={[styles.wrapper, style]}>
        <Icon
          name={iconName}
          size={iconSize}
          style={styles.icon}
          color={iconColor}
        />
        <TouchableHighlight
          onPress={onPress}
          underlayColor="transparent"
          style={styles.touchable}>
          <Text style={styles.text}>.</Text>
        </TouchableHighlight>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default IconButton;
