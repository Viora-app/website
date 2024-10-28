import React, {FC} from 'react';
import NextLink from 'next/link';

import { LinkProps } from './types';

const Link: FC<LinkProps> = ({children, to, className}) => {
  const pathname = to.screen;
  const searchParams = new URLSearchParams(to.params as Record<string, string>).toString();
  const href = `${pathname}${searchParams ? `?${searchParams}` : ''}`;

  return <NextLink href={href} className={className}>{children}</NextLink>;
};

export default Link;

