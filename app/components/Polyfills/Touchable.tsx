import React, {FC} from 'react';

import {TouchableProps} from './types';

const Touchable: FC<TouchableProps> = ({ children, onPress, disabled, ...restProps }) => (
  <button
    onClick={(...rest) => {
      if (!disabled && typeof onPress === 'function') {
        onPress(...rest);
      }
    }}
    {...(restProps || {})}
  >
    {children}
  </button>
);

export const TouchableHighlight = Touchable;

export const TouchableWithoutFeedback = Touchable;

export const TouchableOpacity = Touchable;
