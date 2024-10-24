import React from 'react';
import {Text, View, Image} from 'react-native';
import party from '../../../assets/images/party.png';
import {useTheme} from '../../../hooks/useTheme';
import themedStyles from './styles';
import {ClaimHintProps} from './types';

const ClaimHint = ({formattedPrize, badgeTitle}: ClaimHintProps) => {
  const styles = useTheme(themedStyles);
  return (
    <View style={styles.wrapper}>
      <Image source={party} style={styles.image} />
      <View style={styles.descriptionWrapper}>
        <Text style={styles.description}>
          You are about to claim your&nbsp;
          <Text style={styles.bold}>{badgeTitle}</Text>
          &nbsp;and receive&nbsp;
          <Text style={styles.bold}>{formattedPrize}</Text>
          &nbsp;reward.
        </Text>
      </View>
    </View>
  );
};

export default ClaimHint;
