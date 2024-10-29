import React, { FC } from 'react';
import NextImage from 'next/image';

import { ImageProps } from './types';

const Image: FC<ImageProps> = ({source, alt, className, ...rest}) => (
  <NextImage
    src={source}
    alt={alt || 'Image'}
    className={`text-[0px] ${className}`}
    {...(rest || {})}
  />
);

export default Image;
