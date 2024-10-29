import React from 'react';
import {View} from '../Polyfills';

import Avatar from './Avatar';
import Wallet from './Wallet';

const Basics = () => {
  return (
    <View className="w-full p-6">
      <Avatar />
      <Wallet />
    </View>
  );
};

export default Basics;
