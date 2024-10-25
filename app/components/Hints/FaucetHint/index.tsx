import React from 'react';
import {Text, View, Linking, Image} from '../../Polyfills';
import {useClipboard} from '@react-native-clipboard/clipboard';
import {Button} from '../../Elements';
import {useAccount} from '../../../hooks/useAccount';
import coin from '../../../../public/images/coin.png';

const FaucetHint = () => {
  const {account} = useAccount();
  const [_, setString] = useClipboard();
  const styles = {};

  const onPress = async () => {
    setString(account?.address ?? '');
    await Linking.openURL('https://viora.com/faucet');
  };

  return (
    <View style={styles.wrapper}>
      <Image source={coin} style={styles.image} />
      <Text style={styles.description}>
        You need tokens to use the app. You can receive free tokens from the
        Testnet faucet. Simply copy your address and visit to the Faucet.
      </Text>
      <Button
        title="Copy my address & open Faucet"
        onPress={onPress}
        style={styles.button}
      />
    </View>
  );
};

export default FaucetHint;
