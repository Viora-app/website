import React from 'react';
import {Text, View, Dimensions, ScrollView} from 'react-native';

import {CapitalizeKey} from '../../../utils/formatters';
import {useTheme} from '../../../hooks/useTheme';
import type {FormSummaryProps} from './types';
import themedStyles from './styles';

const FormSummary = ({data}: FormSummaryProps) => {
  const styles = useTheme(themedStyles);
  const maxHeight = Dimensions.get('window').height * 0.6; // @todo use subtraction

  return (
    <ScrollView style={{maxHeight}}>
      {Object.entries(data).map(([key, value], index) => (
        <View key={`${key}${index}`}>
          <Text style={styles.key}>{CapitalizeKey(key)}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default FormSummary;
