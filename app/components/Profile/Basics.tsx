import React from 'react';

import {View} from '@/app/components/Polyfills';
import {getUserAccount} from '@/app/actions/getUserAccount';
import Avatar from './Avatar';
import Wallet from './Wallet';

const Basics = async () => {
  const account = await getUserAccount();

  return (
    <View className="w-full p-6">
      <Avatar data = {account.avatar?.formats ?? {}} />
      <Wallet data={account} />
    </View>
  );
};

export default Basics;
