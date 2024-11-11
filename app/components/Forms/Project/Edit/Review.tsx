'use client'

import React, {useCallback, useEffect, useState} from 'react';
import {View} from '@/app/components/Polyfills';

import {FetchStatus} from '@/app/config/types';
import {ENDPOINTS} from '@/app/config/endpoints';
import {useModal} from '@/app/hooks/useModal';
import {usePatchData} from '@/app/hooks/useQuery';
import {toBaseToken} from '@/app/utils/formatters';
import {finalMessages} from '@/app/utils/modal';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import FormSummary from '@/app/components/FormElements/GenericSummary';
import {Button} from '@/app/components/Elements';
import type {EditProjectReviewProps, Feedback} from './types';

const CreateProjectReview = ({data, projectId}: EditProjectReviewProps) => {
  const {show} = useModal();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const mutation = usePatchData(ENDPOINTS.PROJECTS);

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
          ...(data.soft_goal ? {soft_goal: toBaseToken(data.soft_goal)} : {}),
          ...(data.hard_goal ? {hard_goal: toBaseToken(data.hard_goal)} : {}),
        },
        id: projectId,
      });
    } catch (e) {
      console.error('Error creating project:', e);
    }
  };

  useEffect(() => {
    if (!mutation.isLoading && (mutation.isError || mutation.isSuccess)) {
      onDone({
        status: mutation.isSuccess ? FetchStatus.Success : FetchStatus.Error,
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
    <View>
      <FormSummary data={formattedValue} />
      <View>
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
