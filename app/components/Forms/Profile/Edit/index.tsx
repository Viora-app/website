'use client'

import React, {useState} from 'react';
import {TextInput, View} from '../../../Polyfills';

import {useModal} from '../../../../hooks/useModal';
import {useAccount} from '../../../../hooks/useAccount';
import {Profile} from '../../../../context/accountContext/types';
import {ButtonThemes} from '../../../Elements/Button/types';
import {Button} from '../../../Elements';
import EditProfileReview from './Review';

const EditProfileForm = () => {
  const {account} = useAccount();
  const [data, setData] = useState<Partial<Profile>>({
    first_name: account?.first_name ?? '',
    last_name: account?.last_name ?? '',
  });
  const {show} = useModal();

  const onSubmit = async () => {
    // Keyboard.dismiss();
    show({
      title: 'Looking good!',
      description: '',
      content: <EditProfileReview data={data} />,
    });
  };

  const onChange = (fieldName: string) => (value: string) => {
    setData({
      ...data,
      [fieldName]: value,
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Your name?"
        onChangeText={onChange('first_name')}
        value={data.first_name}
        placeholderTextColor="#333"
      />
      <TextInput
        placeholder="And your last name?"
        onChangeText={onChange('last_name')}
        value={data.last_name}
        placeholderTextColor="#333"
      />
      <View className="flex flex-row justify-center">
        <Button
          title="Continue"
          theme={ButtonThemes.primary}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

export default EditProfileForm;
