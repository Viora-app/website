'use client'

import React, { FC } from 'react';
import { redirect } from 'next/navigation';
import NextImage from 'next/image';

import {AUTH_PROVIDERS} from '@/app/config/constants';
import {apiBaseUrl} from '@/app/config/endpoints';
import {H3, View} from '@/app/components/Polyfills';
import {Button} from '@/app/components/Elements';
import appLogo from '@/public/images/applogo.png';

const Login: FC = () => {
  const onPress = (provider: string) => {
    redirect(`${apiBaseUrl}/connect/${provider}`);
  }

  return (
    <View className="px-6 w-[510px]">
      <View className="p-6 flex flex-row justify-center items-center">
        <NextImage alt="App Logo" src={appLogo} />
      </View>

      <H3 className="text-primaryStrong py-6">Login</H3>

      {
        AUTH_PROVIDERS.map(provider => (
          <Button
            key={provider}
            onPress={() => onPress(provider)}
            title={provider}
          />
        ))
      }
    </View>
  );
};

export default Login;
