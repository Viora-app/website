'use client'

import React from 'react';

import {View, ScrollView, Link} from '@/app/components/Polyfills';
import {toBaseToken} from '@/app/utils/formatters';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import FormSummary from '@/app/components/FormElements/GenericSummary';
import {Button} from '@/app/components/Elements';
import Feedback from '@/app/components/Feedback';
import {FetchStatus} from '@/app/config/types';
import type {CreateContributionTierReviewProps} from './types';
import {Routes} from '@/app/config/routes';

const SubmitTitle = {
  [FetchStatus.Idle]: 'Submit',
  [FetchStatus.Pending]: 'Submitting',
  [FetchStatus.Error]: 'Failed',
  [FetchStatus.Success]: 'Succeeded',
};

const CreateProjectReview = ({
  data, onEdit, onSubmit, feedback, projectId,
}: CreateContributionTierReviewProps) => {
  const handleSubmit = async () => {
    try {
      const result = await onSubmit({
        ...data,
        project: projectId,
        amount: Number(toBaseToken(data?.amount ?? '')),
      });
      console.log('result', result);
    } catch (e) {
      console.error('Error creating project:', e);
    }
  };


  const formattedValue = {
    ...data,
    amount: `${data.amount} ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL}`,
  };

  return (
    <ScrollView className="w-full h-full p-4">
      <FormSummary data={formattedValue} />
      <View className="flex flex-row justify-center gap-4">
        <Link to={{screen: `${Routes.Projects}/${projectId}`}}>
          <Button
            title={'Back to project'}
            theme={ButtonThemes.secondary}
          />
        </Link>
        <Button
          title={'Edit'}
          theme={ButtonThemes.secondary}
          onPress={onEdit}
        />
        <Button
          title={SubmitTitle[feedback.status]}
          theme={ButtonThemes.primary}
          disabled={feedback.status !== FetchStatus.Idle}
          onPress={handleSubmit}
        />
      </View>
      <Feedback {...feedback} />
    </ScrollView>
  );
};

export default CreateProjectReview;
