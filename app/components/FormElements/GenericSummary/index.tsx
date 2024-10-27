import React from 'react';
import {Text, View, Dimensions, ScrollView} from '../../Polyfills';

import {CapitalizeKey} from '../../../utils/formatters';
import type {FormSummaryProps} from './types';

const FormSummary = ({data}: FormSummaryProps) => {
  const maxHeight = Dimensions.get('window').height * 0.6; // @todo use subtraction

  return (
    <ScrollView style={{maxHeight}}>
      {Object.entries(data).map(([key, value], index) => (
        <View key={`${key}${index}`}>
          <Text>{CapitalizeKey(key)}</Text>
          <Text>{value}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default FormSummary;
