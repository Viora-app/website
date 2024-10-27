'use client'

import React, {FC, useEffect, useState} from 'react';
import {Text, View, Image, TextInput} from '../Polyfills';
import {useRouter} from 'next/navigation';

import {Routes} from '../../config/routes';
import {Button} from '../Elements';
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
    <View>
      <Text>{formattedMessage}</Text>
    </View>
  );
};

const Login = () => {
  const [email, setEmail] = useState('ali@muzikie.com');
  const [password, setPassword] = useState('Sina1373ksh');
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
      navigate(Routes.Projects as never);
    }
  }, [account, isNavigating, navigate]);

  const isButtonDisabled = !email || !password;

  return (
    <View>
      <View>
        <Image alt="" source={appLogo} />
      </View>

      <Text>Login</Text>

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

      <View>
        <Button
          onPress={onSubmit}
          title="Sign in"
          disabled={isButtonDisabled}
        />
        <Button
          onPress={onRegister}
          title="Sign up"
          disabled={isButtonDisabled}
        />
      </View>
    </View>
  );
};

export default Login;
