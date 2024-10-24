import React, {useState} from 'react';
import {TextInput, View, Keyboard} from 'react-native';

import {colors} from '../../../../config/stylesGuides';
import {useTheme} from '../../../../hooks/useTheme';
import {usePresets} from '../../../../hooks/usePresets';
import {useModal} from '../../../../hooks/useModal';
import {useAccount} from '../../../../hooks/useAccount';
import {Profile} from '../../../../context/accountContext/types';
import {ButtonThemes} from '../../../Elements/Button/types';
import {Button} from '../../../Elements';
import EditProfileReview from './Review';
import type {ProfileEditFormProps} from './types';
import themedStyles from './styles';

const EditProfileForm = ({style}: ProfileEditFormProps) => {
  const {account} = useAccount();
  const [data, setData] = useState<Partial<Profile>>({
    first_name: account?.first_name ?? '',
    last_name: account?.last_name ?? '',
  });
  const {show} = useModal();
  const styles = useTheme(themedStyles);
  const {presets} = usePresets();

  const onSubmit = async () => {
    Keyboard.dismiss();
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
    <View style={style}>
      <TextInput
        style={styles.input}
        placeholder="Your name?"
        onChangeText={onChange('first_name')}
        value={data.first_name}
        placeholderTextColor={colors[presets.theme].neutralStrong}
      />
      <TextInput
        style={styles.input}
        placeholder="And your last name?"
        onChangeText={onChange('last_name')}
        value={data.last_name}
        placeholderTextColor={colors[presets.theme].neutralStrong}
      />
      <View style={styles.actionBar}>
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
