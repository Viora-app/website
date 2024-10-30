import React, {FC} from 'react';

import {View, H3, Span} from '../Polyfills';
import {SectionHeaderProps} from './types';

const SectionHeader: FC<SectionHeaderProps> = ({title, subtitle, className}) => {
  return (
    <View className={`pb-4 ${className}`}>
      <H3 className="!font-normal">{title}</H3>
      {subtitle && <Span>{subtitle}</Span>}
    </View>
  );
};

export default SectionHeader;
