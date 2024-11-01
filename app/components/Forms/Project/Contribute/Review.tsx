'use client'

import React, {FC, useCallback, useEffect, useState} from 'react';
import {View} from '../../../Polyfills';

import {FetchStatus} from '../../../../config/types';
import {ENDPOINTS} from '../../../../config/endpoints';
import {usePostData} from '../../../../hooks/useQuery';
import {useModal} from '../../../../hooks/useModal';
import {finalMessages} from '../../../../utils/modal';
import {toBaseToken} from '../../../../utils/formatters';
import {Button} from '../../../Elements';
import FormSummary from '../../../FormElements/GenericSummary';
import {ButtonThemes} from '../../../Elements/Button/types';
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
