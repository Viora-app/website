'use client'

import React, {useCallback, useEffect, useState} from 'react';
import {View} from '../../../Polyfills';

import {useModal} from '../../../../hooks/useModal';
import {usePostData} from '../../../../hooks/useQuery';
import {FetchStatus} from '../../../../config/types';
import {toBaseToken} from '../../../../utils/formatters';
import {finalMessages} from '../../../../utils/modal';
import {ButtonThemes} from '../../../Elements/Button/types';
import {ENDPOINTS} from '../../../../config/endpoints';
import FormSummary from '../../../FormElements/GenericSummary';
import {Button} from '../../../Elements';
import type {CreateProjectReviewProps, Feedback} from './types';

const CreateProjectReview = ({data}: CreateProjectReviewProps) => {
  const {show} = useModal();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const mutation = usePostData(ENDPOINTS.PROJECTS);

  const onDone = useCallback(
    (feedback: Feedback) => {
      show(finalMessages(feedback));
    },
    [show],
  );

  const onSubmit = async () => {
    setIsSubmitted(true);
    // Keyboard.dismiss();
    try {
      await mutation.mutateAsync({
        data: {
          ...data,
          soft_goal: toBaseToken(data.soft_goal ?? ''),
          hard_goal: toBaseToken(data.hard_goal ?? ''),
        },
      });
    } catch (e) {
      console.error('Error creating project:', e);
    }
  };

  useEffect(() => {
    if (!mutation.isLoading && (mutation.isError || mutation.isSuccess)) {
      onDone({
        status: mutation.isSuccess ? FetchStatus.success : FetchStatus.error,
        message: mutation.isSuccess ? '' : 'Error creating your project.',
      });
    }
  }, [mutation, onDone]);

  const formattedValue = {
    ...data,
    soft_goal: `${data.soft_goal} ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL}`,
    hard_goal: `${data.hard_goal} ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL}`,
  };

  return (
    <View className="w-full h-[calc(100%-100px)]">
      <FormSummary data={formattedValue} />
      <View className="flex flex-row justify-center">
        <Button
          title={isSubmitted ? 'Updating' : 'Continue'}
          theme={ButtonThemes.primary}
          onPress={onSubmit}
          disabled={isSubmitted}
        />
      </View>
    </View>
  );
};

export default CreateProjectReview;
