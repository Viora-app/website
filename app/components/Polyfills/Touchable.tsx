import React from 'react';

const Touchable = ({ children, onPress }) => (
  <div
    onClick={onPress}
  >
    {children}
  </div>
);

export const TouchableHighlight = Touchable;

export const TouchableWithoutFeedback = Touchable;

export const TouchableOpacity = Touchable;
