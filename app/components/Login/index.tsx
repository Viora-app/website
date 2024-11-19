'use client'

import React, {FC} from 'react';
import {redirect} from 'next/navigation';
import NextImage from 'next/image';

import {H3, View} from '@/app/components/Polyfills';
import {Button, SafeArea} from '@/app/components/Elements';
import appLogo from '@/public/images/applogo.png';

const Login: FC = () => {
  const onPress = () => {
    const baseApiUrl = `${process.env.NEXT_PUBLIC_IMAGE_PROTOCOL}://${process.env.NEXT_PUBLIC_IMAGE_HOSTNAME}${process.env.NEXT_PUBLIC_IMAGE_PORT ? ':' + process.env.NEXT_PUBLIC_IMAGE_PORT : ''}`
    console.log('TO HERE:', `${baseApiUrl}/api/connect/google`);
    redirect(`${baseApiUrl}/api/connect/google`);
  }

  return (
    <SafeArea className="!bg-neutralPure flex flex-col justify-center items-center">
      <View className="px-6 w-[510px]">
        <View className="p-6 flex flex-row justify-center items-center">
          <NextImage alt="App Logo" src={appLogo} />
        </View>

        <H3 className="text-primaryStrong py-6">Login</H3>

        <Button
          onPress={onPress}
          title="Google"
        />
      </View>
    </SafeArea>
  );
};

export default Login;
