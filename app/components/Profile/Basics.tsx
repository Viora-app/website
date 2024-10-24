import React from 'react';
import {View} from 'react-native';

import {useTheme} from '../../hooks/useTheme';
import Avatar from './Avatar';
import Wallet from './Wallet';
import themedStyles from './styles';

const Basics = () => {
  const styles = useTheme(themedStyles);
  return (
    <View style={styles.profileDetails}>
      <Avatar />
      <Wallet />
    </View>
  );
};

export default Basics;
