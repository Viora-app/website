'use client'

import React, {FC, useEffect, useState} from 'react';
import {redirect} from 'next/navigation';
import NextImage from 'next/image';

import {Routes} from '@/app/config/routes';
import {Small, H3, Span, View, TextInput} from '@/app/components/Polyfills';
import {Button, SafeArea} from '@/app/components/Elements';
import {useAccount} from '@/app/hooks/useAccount';
import appLogo from '@/public/images/applogo.png';

const ErrorMessage: FC<{errorMessage: string}> = ({errorMessage}) => {
  if (typeof errorMessage !== 'string' || !errorMessage) {
    return null;
  }
  const networkReg = /network/i;
  let formattedMessage = errorMessage;

  if (networkReg.test(errorMessage)) {
    formattedMessage = 'Check your internet connection';
  } else {
    formattedMessage = 'The email/password combination was not correct.';
  }

  return (
    <View className="pb-4">
      <Small className="text-warnStrong">{formattedMessage}</Small>
    </View>
  );
};

const Login = () => {
  const onPress = () => {
    const baseApiUrl = `${process.env.NEXT_PUBLIC_IMAGE_PROTOCOL}://${process.env.NEXT_PUBLIC_IMAGE_HOSTNAME}${process.env.NEXT_PUBLIC_IMAGE_PORT ? ':' + process.env.NEXT_PUBLIC_IMAGE_PORT : ''}`
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
