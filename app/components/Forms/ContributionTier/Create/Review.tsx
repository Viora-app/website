'use client'

import React, {useCallback, useEffect, useState} from 'react';
import {View} from '@/app/components/Polyfills';

import {useModal} from '@/app/hooks/useModal';
import {usePostData} from '@/app/hooks/useQuery';
import {FetchStatus} from '@/app/config/types';
import {finalMessages} from '@/app/utils/modal';
import {toBaseToken} from '@/app/utils/formatters';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import {ENDPOINTS} from '@/app/config/endpoints';
import FormSummary from '@/app/components/FormElements/GenericSummary';
import {Button} from '@/app/components/Elements';
import type {CreateContributionTierReviewProps, Feedback} from './types';

const CreateProjectReview = ({
  data,
  projectId,
}: CreateContributionTierReviewProps) => {
  const {show} = useModal();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const mutation = usePostData(ENDPOINTS.CONTRIBUTION_TIERS);

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
          amount: toBaseToken(data.amount ?? ''),
          project: projectId,
        },
      });
    } catch (e) {
      console.error('Error adding contribution tier:', e);
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
    amount: `${data.amount} ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL}`,
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
