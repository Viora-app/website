import React from 'react';
import {View, Text, TouchableHighlight} from '../../Polyfills';
import {Icon} from '../Icon';
import {CheckboxProps} from './types';

const Checkbox = ({
  title, selected, onSelect,
}: CheckboxProps) => {
  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={onSelect}>
      <>
        <View>
          <Text>{title}</Text>
        </View>
        <View>
          {selected && <Icon name="check" color="#fff" />}
        </View>
      </>
    </TouchableHighlight>
  );
};

export default Checkbox;
