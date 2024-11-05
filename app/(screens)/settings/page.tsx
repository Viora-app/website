'use client'

import React from 'react';
import {useRouter} from 'next/navigation';

import {Routes} from '@/app/config/routes';
import {usePresets} from '@/app/hooks/usePresets';
import {useModal} from '@/app/hooks/useModal';
import {SafeArea} from '@/app/components/Elements';
import Option from '@/app/components/Elements/Option';
import SelectTheme from '@/app/components/SelectTheme';
import SectionHeader from '@/app/components/SectionHeader';
import About from '@/app/components/About';
import {useAccount} from '@/app/hooks/useAccount';

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
  const {push: navigate} = useRouter();
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
    navigate(Routes.Login as never);
  };

  return (
    <SafeArea className="p-6">
      <SectionHeader title="Account" />
      <Option title="Connect" state="Coming soon" onPress={connect} />
      <SectionHeader title="Other settings" className="pt-6" />
      <Option title="Theme" state={theme} onPress={setTheme} />
      <Option title="Terms of use" href="https://viora.app/terms" />
      <Option title="About" onPress={showAbout} />
      <Option title="Logout" onPress={Logout} icon="logout" />
    </SafeArea>
  );
};

export default SettingsScreen;
