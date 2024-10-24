import React, {useState} from 'react';
import {View, Keyboard, ScrollView, Dimensions} from 'react-native';
import {TOKEN_SYMBOL} from '@env';

import {useTheme} from '../../../../hooks/useTheme';
import {useModal} from '../../../../hooks/useModal';
import {validateForm} from '../../../../utils/validators';
import {ContributionTierAttrs} from '../../../Projects/types';
import ValidationFeedback from '../../../FormElements/ValidationFeedback';
import {ButtonThemes} from '../../../Elements/Button/types';
import {Button, Input} from '../../../Elements';
import CreateContributionTierReview from './Review';
import type {ContributionTier} from './types';
import {schema} from './schema';
import themedStyles from './styles';

const CreateContributionTierForm = ({id, style}: ContributionTier) => {
  const [data, setData] = useState<Partial<ContributionTierAttrs>>({
    name: '',
    description: '',
    rewards: '',
    amount: 0,
  });
  const {show} = useModal();
  const styles = useTheme(themedStyles);
  const maxHeight = Dimensions.get('window').height * 0.6;

  const onSubmit = async () => {
    Keyboard.dismiss();
    show({
      title: 'Looking good!',
      description: '',
      content: <CreateContributionTierReview data={data} project={id} />,
    });
  };

  const onChange = (fieldName: string) => (value: string) => {
    setData({
      ...data,
      [fieldName]: value,
    });
  };

  const validity = validateForm(schema, data);

  return (
    <View style={style}>
      <ScrollView style={{maxHeight}}>
        <Input
          placeholder="Name"
          onChange={onChange}
          value={data.name}
          name="name"
        />
        <Input
          placeholder="Description (10-100 characters)"
          onChange={onChange}
          value={data.description}
          name="description"
          multiline
        />
        <Input
          placeholder="Rewards (Min 140 characters)"
          onChange={onChange}
          value={data.rewards}
          name="rewards"
          multiline
        />
        <Input
          placeholder={`Amount (in ${TOKEN_SYMBOL})`}
          onChange={onChange}
          value={data.amount}
          name="amount"
          inputMode="decimal"
        />
      </ScrollView>
      <ValidationFeedback {...validity} />
      <View style={styles.actionBar}>
        <Button
          title="Continue"
          theme={ButtonThemes.primary}
          onPress={onSubmit}
          disabled={!validity.isValid}
        />
      </View>
    </View>
  );
};

export default CreateContributionTierForm;
