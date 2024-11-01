'use client'

import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

import {Routes} from '../../config/routes';
import {Small, H3, Span, View, Image, TextInput} from '../Polyfills';
import {Button, SafeArea} from '../Elements';
import {useAccount} from '../../hooks/useAccount';
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

  const onSubmit = async () => {
    if (email && password) {
      await signIn(email, password);
    }
  };

  const onRegister = async () => {
    if (email && password) {
      await signUp(email, password, email);
    }
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
      <View className="px-6 w-[510px]">
        <View className="p-6 flex flex-row justify-center items-center">
          <Image alt="App Logo" source={appLogo} />
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
        />

        <ErrorMessage errorMessage={error} />

        <View className="flex flex-row nowrap gap-6 justify-center items-center">
          <Button
            onPress={onSubmit}
            title="Sign in"
            disabled={isButtonDisabled}
          />
          <Span>Or</Span>
          <Button
            onPress={onRegister}
            title="Sign up"
            disabled={isButtonDisabled}
          />
        </View>
      </View>
    </SafeArea>
  );
};

export default Login;
