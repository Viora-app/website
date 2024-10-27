import React from 'react';
import {Text, View} from '../../Polyfills';

import {FeedbackProps} from './types';

const ValidationFeedback = ({message}: FeedbackProps) => {
  return (
    <View>
      <Text>{message}</Text>
    </View>
  );
};

export default ValidationFeedback;
