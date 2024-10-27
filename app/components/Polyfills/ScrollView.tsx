import React, {FC} from 'react';

import {BaseElementProps} from './types';

const ScrollView: FC<BaseElementProps> = ({ children, ...rest }) => (
  <div {...(rest || {})}>{children}</div>
);

export default ScrollView;
