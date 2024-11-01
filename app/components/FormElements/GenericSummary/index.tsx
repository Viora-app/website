import React from 'react';
import {Span, H4, View, ScrollView} from '../../Polyfills';

import {CapitalizeKey} from '../../../utils/formatters';
import type {FormSummaryProps} from './types';

const FormSummary = ({data}: FormSummaryProps) => (
  <ScrollView>
    {Object.entries(data).map(([key, value], index) => (
      <View key={`${key}${index}`} className="pb-4">
        <Span className="text-neutralStrong">{CapitalizeKey(key)}</Span>
        <H4 className="!font-light text-neutralMighty">{value}</H4>
      </View>
    ))}
  </ScrollView>
);

export default FormSummary;
