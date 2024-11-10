'use client'

import React, {FC, useEffect, useRef, useState} from 'react';

import {Timeout} from '@/app/config/types';
import {truncateAddress} from '@/app/utils/formatters';
import {View, H1, H2, H4, Span, TouchableHighlight} from '@/app/components/Polyfills';

const Wallet: FC = ({data}) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<Timeout>();
  const presets = {};
  const onPress = async () => {
    setCopied(true);
    timer.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
    navigator.clipboard.writeText(data?.address ?? '');
  };

  useEffect(() => () => {
    clearTimeout(timer.current);
  }, []);

  const fullName = [data?.first_name, data?.last_name]
    .filter(item => !!item)
    .join(' ');

  return (
    <View className="w-full bg-neutralPale rounded-3xl relative mt-14 pb-6">
      <svg width="98" height="44" viewBox="0 0 49 22" fill={presets.theme === 'dark' ? '#111111' : '#CCCCCC'} xmlns="http://www.w3.org/2000/svg" className="relative mx-auto top-[-44px] ">
        <path d="M49 22C38 22 38.031 22 24.5 22C10.969 22 11 22 0 22C24.5 22 10.969 0 24.5 0C38.031 0 26.2093 22 49 22Z" />
      </svg>
      <View>
        {fullName.length ? (
          <View className="w-full text-center mb-6">
            <H2 className="text-primaryStrong font-light">{fullName}</H2>
          </View>
        ) : null}
        <View className="w-full text-center mb-6">
          <Span className="text-neutralSteady font-light">Points</Span>
          <H1 className="text-primaryStrong">
            {data?.points ?? 0}
          </H1>
        </View>
        <View className="w-full text-center">
          <Span className="text-neutralSteady font-light">{`${
            process.env.NEXT_PUBLIC_NETWORK_NAME || ''
          } Wallet Address`}</Span>
          <TouchableHighlight onPress={onPress} className="w-full">
            <H4
              className="font-light">
              {copied ? 'Copied to clipboard' : (truncateAddress(data?.address ?? '') ?? 'Loading')}
            </H4>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default Wallet;
