import React, { FC } from 'react';

import { BaseElementProps } from './types';

const Text: FC<BaseElementProps> = ({children, ...rest}) => (
  <span {...(rest || {})}>{children}</span>
);

export default Text;
