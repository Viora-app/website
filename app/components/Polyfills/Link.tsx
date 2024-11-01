'use client'

import React, {FC} from 'react';
import NextLink from 'next/link';
import {usePathname} from 'next/navigation';

import { LinkProps } from './types';

const Link: FC<LinkProps> = ({children, to, className, markActive}) => {
  const route = usePathname();
  const pathname = to.screen;
  const searchParams = new URLSearchParams(to.params as Record<string, string>).toString();
  const href = `${pathname}${searchParams ? `?${searchParams}` : ''}`;
  const isActive = markActive && route.replace(/^\//, '') === to.screen.replace(/^\//, '');

  return <NextLink href={href} className={`${isActive ? 'bg-assureStrong' : ''} ${className}`}>{children}</NextLink>;
};

export default Link;

