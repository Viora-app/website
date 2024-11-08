'use client'

import React, {FC} from 'react';
import {signIn} from 'next-auth/react';

import {TouchableHighlight, Span} from '@/app/components/Polyfills';
import {Icon} from '@/app/components/Elements';
import {AuthButtonProps} from './types';

const AuthButton: FC<AuthButtonProps> = ({providerName, className = ''}) => {
  const onPress = async () => {
    signIn(providerName, {redirect: false});
  }

  return (
    <TouchableHighlight
      onPress={onPress}
      className={`rounded-md w-[225px] grow text-center h-[50px] cursor-pointer flex flex-row items-center px-4 border ${providerName === 'apple' ?  'bg-[#000] border-[#fff]' : 'bg-[#fff] border-[#000]'} ${className}`}
    >
      <Icon name={providerName} size={20} color={providerName === 'apple' ? '#fff' : '#000'} />
      <Span className={`!pl-4 leading-[50px] ${providerName === 'apple' ? 'text-[#fff]' : 'text-[#000]'}`}>Sign in using&nbsp;</Span>
      <Span className={`!pl-0 leading-[50px] capitalize ${providerName === 'apple' ? 'text-[#fff]' : 'text-[#000]'}`}>{providerName}</Span>
    </TouchableHighlight>
  );
};


export default AuthButton;
