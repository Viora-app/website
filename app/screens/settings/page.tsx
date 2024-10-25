import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {Routes} from '../../config/routes';
import {usePresets} from '../../hooks/usePresets';
import {useModal} from '../../hooks/useModal';
import {SafeArea} from '../../components/Elements';
import Option from '../../components/Elements/Option';
import SelectTheme from '../../components/SelectTheme';
import SectionHeader from '../../components/SectionHeader';
import About from '../../components/About';
import {useAccount} from '../../hooks/useAccount';

const config = {
  backup: {
    title: 'Backup',
    description:
      'Keep your secret key safe and private. It’s your only way to accessing your account. There is no way to recover it.',
  },
  theme: {
    title: 'Select a theme',
    description: '',
  },
  about: {
    title: 'About',
    description: '',
  },
};

const THEME_TITLES = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

const SettingsScreen = () => {
  const {presets} = usePresets();
  const {show} = useModal();
  const navigation = useNavigation();
  const {signOut} = useAccount();
  const theme = THEME_TITLES[presets.theme];

  const connect = () => {};

  const setTheme = () => {
    show({
      ...config.theme,
      content: <SelectTheme />,
    });
  };

  const showAbout = () => {
    show({
      ...config.about,
      content: <About />,
    });
  };

  const Logout = async () => {
    await signOut();
    navigation.navigate(Routes.Login as never);
  };

  return (
    <SafeArea>
      <SectionHeader title="Account" />
      <Option title="Connect" state="Coming soon" onPress={connect} />
      <SectionHeader title="Other settings" />
      <Option title="Theme" state={theme} onPress={setTheme} />
      <Option title="Terms of use" href="https://viora.app/terms" />
      <Option title="About" onPress={showAbout} />
      <Option title="Logout" onPress={Logout} icon="logout" />
    </SafeArea>
  );
};

export default SettingsScreen;
