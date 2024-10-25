import React, {FC, useEffect, useState} from 'react';
import {Text, View, Image, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Routes} from '../../config/routes';
import {Button} from '../../components/Elements';
import {useAccount} from '../../hooks/useAccount';
import appLogo from '../../assets/images/applogo.png';

const ErrorMessage: FC<{errorMessage: string}> = ({errorMessage}) => {
  const styles = {};

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
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{formattedMessage}</Text>
    </View>
  );
};

const LoginScreen = () => {
  const styles = {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
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
      navigation.navigate(Routes.Tabs as never);
    }
  }, [account, isNavigating, navigation]);

  const isButtonDisabled = !email || !password;

  return (
    <View style={styles.screenContainer}>
      <View style={styles.logoContainer}>
        <Image source={appLogo} style={styles.logo} />
      </View>

      <Text style={styles.title}>Login</Text>

      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={[styles.input, error ? styles.inputError : null]}
        placeholderTextColor={styles.placeholderTextColor}
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        style={[styles.input, error ? styles.inputError : null]}
        placeholderTextColor={styles.placeholderTextColor}
      />

      <ErrorMessage errorMessage={error} />

      <View style={styles.buttonContainer}>
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

export default LoginScreen;
