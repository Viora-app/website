import React from 'react';
import {View, Text, TouchableHighlight, Linking} from '../../Polyfills';
import {Icon} from '../index';
import {OptionProps} from './types';

const Option = ({
  title, state, href, onPress, icon = 'rightChev',
}: OptionProps) => {
  if (!icon && href) {
    icon = 'link';
  }

  if (href && !onPress) {
    onPress = () => {
      Linking.openURL(href);
    };
  }

  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={onPress}>
      <>
        <View>
          <Text>{title}</Text>
        </View>
        <View>
          <Text>{state}</Text>
          <View>
            <Icon name={icon} />
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
};

export default Option;
