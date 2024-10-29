import React, {FC} from 'react';

import {TouchableProps} from './types';

const Touchable: FC<TouchableProps> = ({ children, onPress, ...restProps }) => (
  <div
    onClick={onPress}
    {...(restProps || {})}
  >
    {children}
  </div>
);

export const TouchableHighlight = Touchable;

export const TouchableWithoutFeedback = Touchable;

export const TouchableOpacity = Touchable;
