import React, {FC} from 'react';
import {View, Text} from '../Polyfills';
import {SectionHeaderProps} from './types';

const SectionHeader: FC<SectionHeaderProps> = ({title, subtitle}) => {
  return (
    <View>
      <Text>{title}</Text>
      {subtitle && <Text>{subtitle}</Text>}
    </View>
  );
};

export default SectionHeader;
