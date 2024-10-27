import React from 'react';
import {Text, View} from '../Polyfills';
import {FeedbackProps} from './types';
import {FetchStatus} from '../../config/types';

const messages = {
  [FetchStatus.idle]: '',
  [FetchStatus.pending]: '',
  [FetchStatus.success]: 'Thank you for sharing.',
  [FetchStatus.error]: 'Oops, try again later.',
};

const Feedback = ({status, message}: FeedbackProps) => {
  return (
    <View>
      <Text>
        {message || messages[status]}
      </Text>
    </View>
  );
};

export default Feedback;
