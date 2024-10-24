import React from 'react';
import {Text, View} from 'react-native';

import {useTheme} from '../../../hooks/useTheme';
import themedStyles from './styles';
import {FeedbackProps} from './types';

const ValidationFeedback = ({style, message}: FeedbackProps) => {
  const styles = useTheme(themedStyles);
  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.error}>{message}</Text>
    </View>
  );
};

export default ValidationFeedback;
