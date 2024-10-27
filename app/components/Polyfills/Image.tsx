import React, { FC } from 'react';
import NextImage from 'next/image';

import { ImageProps } from './types';

const Image: FC<ImageProps> = ({source, alt, ...rest}) => (
  <NextImage src={source} alt={alt || 'Image'}  {...(rest || {})} />
);

export default Image;
