import React from 'react';

import {View} from '@/app/components/Polyfills';
import Avatar from './Avatar';
import Wallet from './Wallet';

const Basics = async ({ account }) => {
  return (
    <View className="w-full p-6">
      <Avatar data = {account.avatar?.formats ?? {}} />
      <Wallet data={account} />
    </View>
  );
};

export default Basics;
