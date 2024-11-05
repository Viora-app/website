'use client'

import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import NextImage from 'next/image';

import {Routes} from '@/app/config/routes';
import {Small, H3, Span, View, TextInput} from '@/app/components/Polyfills';
import {Button, SafeArea} from '@/app/components/Elements';
import {useAccount} from '@/app/hooks/useAccount';
import appLogo from '../../../public/images/applogo.png';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {push: navigate} = useRouter();
  const {signIn, signUp, account, error} = useAccount();
  const [isNavigating, setIsNavigating] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  const onRegister = async () => {
    signUp(email, password, email);
  };

  useEffect(() => {
    if (!!account?.jwt && !isNavigating) {
      setIsNavigating(true);
      navigate(Routes.Home as never);
    }
  }, [account, isNavigating, navigate]);

  const isButtonDisabled = !email || !password;

  return (
    <SafeArea className="!bg-neutralPure flex flex-col justify-center items-center">
      <form className="px-6 w-[510px]" onSubmit={onSubmit}>
        <View className="p-6 flex flex-row justify-center items-center">
          <NextImage alt="App Logo" src={appLogo} />
        </View>

        <H3 className="text-primaryStrong py-6">Login</H3>

        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          keyboardType="password"
        />

        <ErrorMessage errorMessage={error} />

        <View className="flex flex-row nowrap gap-6 justify-center items-center">
          <Button
            title="Sign in"
            disabled={isButtonDisabled}
            type="submit"
          />
          <Span>Or</Span>
          <Button
            onPress={onRegister}
            title="Sign up"
            disabled={isButtonDisabled}
          />
        </View>
      </form>
    </SafeArea>
  );
};

export default Login;
