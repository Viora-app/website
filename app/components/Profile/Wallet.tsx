'use client'

import React, {FC} from 'react';

import {truncateAddress} from '../../utils/formatters';
import {Themes} from '../../context/presetsContext/types';
import lightCarrot from '../../../public/images/lightcarrot.png';
import darkCarrot from '../../../public/images/darkcarrot.png';
import {usePresets} from '../../hooks/usePresets';
import {useModal} from '../../hooks/useModal';
import {useAccount} from '../../hooks/useAccount';
import {View, Image, H1, H2, H4, Span} from '../Polyfills';

const carrots = {
  [Themes.light]: lightCarrot,
  [Themes.dark]: darkCarrot,
};

const Wallet: FC = () => {
  const {show} = useModal();
  const {presets} = usePresets();
  const {account} = useAccount();

  const onPress = async () => {
    navigator.clipboard.writeText(account?.address ?? '')
    show({
      title: 'Address copied',
      description: `The ${process.env.NEXT_PUBLIC_NETWORK_NAME} wallet address is copied to your clipboard. Remember yo only need ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL} tokens in this account address to use in Viora.`,
    });
  };

  const fullName = [account?.first_name, account?.last_name]
    .filter(item => !!item)
    .join(' ');

  return (
    <View className="w-full bg-neutralPure rounded-3xl relative mt-14 pb-6">
      <Image alt="Carrot" source={carrots[presets.theme]} className="relative mx-auto top-[-44px]" />
      <View>
        {fullName.length ? (
          <View className="w-full text-center mb-6">
            <H2 className="text-primaryStrong font-light">{fullName}</H2>
          </View>
        ) : null}
        <View className="w-full text-center mb-6">
          <Span className="text-neutralSteady font-light">Points</Span>
          <H1 className="text-primaryStrong">
            {account?.points ?? 0}
          </H1>
        </View>
        <View className="w-full text-center">
          <Span className="text-neutralSteady font-light">{`${
            process.env.NEXT_PUBLIC_NETWORK_NAME || ''
          } Wallet Address`}</Span>
          <H4
            className="font-light"
            onPress={onPress}>
            {truncateAddress(account?.address ?? 'asdasdasdasd') ?? 'Loading'}
          </H4>
        </View>
      </View>
    </View>
  );
};

export default Wallet;
