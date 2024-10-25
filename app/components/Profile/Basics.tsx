import React from 'react';
import {View} from 'react-native';

import Avatar from './Avatar';
import Wallet from './Wallet';

const Basics = () => {
  const styles = {};
  return (
    <View style={styles.profileDetails}>
      <Avatar />
      <Wallet />
    </View>
  );
};

export default Basics;
