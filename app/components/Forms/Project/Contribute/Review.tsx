'use client'

import React, {FC, useCallback, useEffect, useState} from 'react';
import {View} from '@/app/components/Polyfills';

import {FetchStatus} from '@/app/config/types';
import {ENDPOINTS} from '@/app/config/endpoints';
import {usePostData} from '@/app/hooks/useQuery';
import {useModal} from '@/app/hooks/useModal';
import {finalMessages} from '@/app/utils/modal';
import {toBaseToken} from '@/app/utils/formatters';
import {Button} from '@/app/components/Elements';
import FormSummary from '@/app/components/FormElements/GenericSummary';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import {ContributionReviewProps, Feedback} from './types';

const ContributionReview: FC<ContributionReviewProps> = ({
  id,
  projectId,
  data,
  refresh,
}) => {
  const {show} = useModal();
  const mutation = usePostData(ENDPOINTS.CONTRIBUTIONS);
  const [clicked, setClicked] = useState(false);

  const onSubmit = async () => {
    setClicked(true);
    await mutation.mutate({
      project: String(projectId),
      contribution_tier: String(id),
      amount: toBaseToken(data.amount),
    });
    refresh();
  };

  const onDone = useCallback(
    (feedback: Feedback) => {
      show(finalMessages(feedback));
    },
    [show],
  );

  useEffect(() => {
    if (!mutation.isLoading && (mutation.isError || mutation.isSuccess)) {
      onDone({
        status: mutation.isSuccess ? FetchStatus.success : FetchStatus.error,
        message: mutation.isSuccess ? '' : 'Error contributing. Try later',
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
      <Button
        title="Pay now"
        theme={ButtonThemes.primary}
        onPress={onSubmit}
        disabled={clicked}
      />
    </View>
  );
};

export default ContributionReview;
