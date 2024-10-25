import React from 'react';
import {View, Text, Image} from '../Polyfills';
import {useClipboard} from '@react-native-clipboard/clipboard';
import {NETWORK_NAME, TOKEN_SYMBOL} from '@env';

import {truncateAddress} from '../../utils/formatters';
import {Themes} from '../../context/presetsContext/types';
import {fonts} from '../../config/stylesGuides';
import lightCarrot from '../../../public/images/lightcarrot.png';
import darkCarrot from '../../../public/images/darkcarrot.png';
import {usePresets} from '../../hooks/usePresets';
import {useModal} from '../../hooks/useModal';
import {useAccount} from '../../hooks/useAccount';
import type {WalletProps} from './types';

const carrots = {
  [Themes.light]: lightCarrot,
  [Themes.dark]: darkCarrot,
};

const Wallet = ({style}: WalletProps) => {
  const styles = {};
  const [_, setString] = useClipboard();
  const {show} = useModal();
  const {presets} = usePresets();
  const {account} = useAccount();

  const onPress = async () => {
    setString(account?.address ?? '');
    show({
      title: 'Address copied',
      description: `The ${NETWORK_NAME} wallet address is copied to your clipboard. Remember yo only need ${TOKEN_SYMBOL} tokens in this account address to use in Viora.`,
    });
  };

  const fullName = [account?.first_name, account?.last_name]
    .filter(item => !!item)
    .join(' ');

  return (
    <View style={[styles.walletWrapper, style]}>
      <Image source={carrots[presets.theme]} />
      <View style={styles.walletInfo}>
        {fullName.length ? (
          <View style={styles.walletContainer}>
            <Text style={[fonts.h2, styles.primaryStrong]}>{fullName}</Text>
          </View>
        ) : null}
        <View style={[styles.walletContainer]}>
          <Text style={[fonts.base, styles.tender]}>Points</Text>
          <Text style={[fonts.h1, styles.primaryStrong, styles.textCenter]}>
            {account?.points ?? 0}
          </Text>
        </View>
        <View style={styles.walletContainer}>
          <Text style={[fonts.base, styles.tender, styles.spacerMini]}>{`${
            NETWORK_NAME || ''
          } Wallet Address`}</Text>
          <Text
            style={[fonts.h3, styles.primaryStrong, styles.textCenter]}
            onPress={onPress}>
            {truncateAddress(account?.address ?? '') ?? 'Loading'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Wallet;
