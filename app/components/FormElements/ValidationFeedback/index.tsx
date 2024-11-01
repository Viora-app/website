import React from 'react';
import {Small, View} from '../../Polyfills';

import {FeedbackProps} from './types';

const ValidationFeedback = ({message}: FeedbackProps) => {
  return (
    <View className="w-full">
      <Small className="text-warnStrong">{message}</Small>
    </View>
  );
};

export default ValidationFeedback;
