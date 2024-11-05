import React, {useState} from 'react';
import {View, ScrollView} from '@/app/components/Polyfills';

import {useModal} from '@/app/hooks/useModal';
import {validateForm} from '@/app/utils/validators';
import {ContributionTierAttrs} from '../../../Projects/types';
import ValidationFeedback from '@/app/components/FormElements/ValidationFeedback';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import {Button, Input} from '@/app/components/Elements';
import CreateContributionTierReview from './Review';
import type {ContributionTier} from './types';
import {schema} from './schema';

const CreateContributionTierForm = ({id}: ContributionTier) => {
  const [data, setData] = useState<Partial<ContributionTierAttrs>>({
    name: '',
    description: '',
    rewards: '',
    amount: 0,
 });
  const {show} = useModal();
  const onSubmit = async () => {
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
    <View>
      <ScrollView>
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
          placeholder={`Amount (in ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL})`}
          onChange={onChange}
          value={data.amount}
          name="amount"
          inputMode="decimal"
        />
      </ScrollView>
      <ValidationFeedback {...validity} />
      <View>
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
