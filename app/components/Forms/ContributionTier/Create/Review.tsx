import React, {useCallback, useEffect, useState} from 'react';
import {View, Keyboard} from 'react-native';
import {TOKEN_SYMBOL} from '@env';

import {useTheme} from '../../../../hooks/useTheme';
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
import themedStyles from './styles';

const CreateProjectReview = ({
  data,
  project,
}: CreateContributionTierReviewProps) => {
  const {show} = useModal();
  const styles = useTheme(themedStyles);
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
    Keyboard.dismiss();
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
    amount: `${data.amount} ${TOKEN_SYMBOL}`,
  };

  return (
    <View style={styles.reviewWrapper}>
      <FormSummary data={formattedValue} />
      <View style={styles.actionBar}>
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
