import React, {FC} from 'react';
import NextLink from 'next/link';

import { LinkProps } from './types';

const Link: FC<LinkProps> = ({children, to, className}) => {

  const url = new URL(to.screen, 'http://localhost:3000');
  Object.entries(to.params ?? {}).forEach(([key, value]) => {
    url.searchParams.append(key, value as string);
  });

  return <NextLink href={url.href} className={className}>{children}</NextLink>;
}

export default Link;

