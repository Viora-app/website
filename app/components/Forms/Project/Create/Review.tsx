'use client'

import React, {FC, useState} from 'react';

import {View, ScrollView} from '@/app/components/Polyfills';
import {toBaseToken} from '@/app/utils/formatters';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import FormSummary from '@/app/components/FormElements/GenericSummary';
import {Button} from '@/app/components/Elements';
import type {CreateProjectReviewProps} from './types';

const CreateProjectReview: FC<CreateProjectReviewProps> = ({data, onEdit, onSubmit}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitted(true);
    try {
      onSubmit({
        ...data,
        soft_goal: toBaseToken(data.soft_goal ?? ''),
        hard_goal: toBaseToken(data.hard_goal ?? ''),
      });
    } catch (e) {
      setIsSubmitted(false);
      console.error('Error creating project:', e);
    }
  };

  const formattedValue = {
    ...data,
    soft_goal: `${data.soft_goal} ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL}`,
    hard_goal: `${data.hard_goal} ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL}`,
  };

  return (
    <ScrollView className="w-full h-full p-4">
      <FormSummary data={formattedValue} />
      <View className="flex flex-row justify-center gap-4">
        <Button
          title={'Edit'}
          theme={ButtonThemes.secondary}
          onPress={onEdit}
        />
        <Button
          title={isSubmitted ? 'Updating' : 'Continue'}
          theme={ButtonThemes.primary}
          onPress={handleSubmit}
          disabled={isSubmitted}
        />
      </View>
    </ScrollView>
  );
};

export default CreateProjectReview;
