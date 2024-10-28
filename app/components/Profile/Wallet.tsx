'use client'

import React, {FC} from 'react';
import {View, Text, Image} from '../Polyfills';

import {truncateAddress} from '../../utils/formatters';
import {Themes} from '../../context/presetsContext/types';
import lightCarrot from '../../../public/images/lightcarrot.png';
import darkCarrot from '../../../public/images/darkcarrot.png';
import {usePresets} from '../../hooks/usePresets';
import {useModal} from '../../hooks/useModal';
import {useAccount} from '../../hooks/useAccount';

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
    <View>
      <Image alt="" source={carrots[presets.theme]} />
      <View>
        {fullName.length ? (
          <View>
            <Text>{fullName}</Text>
          </View>
        ) : null}
        <View>
          <Text>Points</Text>
          <Text>
            {account?.points ?? 0}
          </Text>
        </View>
        <View>
          <Text>{`${
            process.env.NEXT_PUBLIC_NETWORK_NAME || ''
          } Wallet Address`}</Text>
          <Text
            onPress={onPress}>
            {truncateAddress(account?.address ?? '') ?? 'Loading'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Wallet;
