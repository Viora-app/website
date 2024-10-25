import React from 'react';
import {Text, View} from '../../Polyfills';

import {FeedbackProps} from './types';

const ValidationFeedback = ({style, message}: FeedbackProps) => {
  const styles = {};
  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.error}>{message}</Text>
    </View>
  );
};

export default ValidationFeedback;
