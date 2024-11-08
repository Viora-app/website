import React from 'react';
import NextImage from 'next/image';

import {H1, View} from '@/app/components/Polyfills';
import {SafeArea} from '@/app/components/Elements';
import AuthButton from '@/app/components/AuthButton';
import appLogo from '@/public/images/app-logo-white.svg';

const Login = () => (
  <SafeArea className="flex flex-col justify-center items-center">
    <View className="px-6 w-[510px] flex flex-col justify-center items-center">
      <View className="p-6 flex flex-row justify-center items-center">
        <NextImage alt="App Logo" src={appLogo} />
        <H1 className="font-poppins text-bodyColor text-3xl font-bold pl-4">Viora</H1>
      </View>

      <AuthButton providerName="google" className="mb-2" />
      <AuthButton providerName="apple" />

    </View>
  </SafeArea>
);

export default Login;
