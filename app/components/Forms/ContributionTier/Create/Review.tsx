'use client'

import React, {useCallback, useEffect, useState} from 'react';
import {View} from '../../../Polyfills';

import {useModal} from '../../../../hooks/useModal';
import {usePostData} from '../../../../hooks/useQuery';
import {FetchStatus} from '../../../../config/types';
import {finalMessages} from '../../../../utils/modal';
import {toBaseToken} from '../../../../utils/formatters';
import {ButtonThemes} from '../../../Elements/Button/types';
import {ENDPOINTS} from '../../../../config/endpoints';
import FormSummary from '../../../FormElements/GenericSummary';
import {Button} from '../../../Elements';
import type {CreateContributionTierReviewProps, Feedback} from './types';

const CreateProjectReview = ({
  data,
  project,
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
          project,
        },
      });
    } catch (e) {
      console.error('Error adding contribution tier:', e);
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
