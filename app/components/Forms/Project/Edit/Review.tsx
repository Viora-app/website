import React, {useCallback, useEffect, useState} from 'react';
import {View, Keyboard} from 'react-native';
import {TOKEN_SYMBOL} from '@env';

import {FetchStatus} from '../../../../config/types';
import {ENDPOINTS} from '../../../../config/endpoints';
import {useTheme} from '../../../../hooks/useTheme';
import {useModal} from '../../../../hooks/useModal';
import {usePatchData} from '../../../../hooks/useQuery';
import {toBaseToken} from '../../../../utils/formatters';
import {finalMessages} from '../../../../utils/modal';
import {ButtonThemes} from '../../../Elements/Button/types';
import FormSummary from '../../../FormElements/GenericSummary';
import {Button} from '../../../Elements';
import type {EditProjectReviewProps, Feedback} from './types';
import themedStyles from './styles';

const CreateProjectReview = ({data, id}: EditProjectReviewProps) => {
  const {show} = useModal();
  const styles = useTheme(themedStyles);
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
    Keyboard.dismiss();
    try {
      await mutation.mutateAsync({
        data: {
          ...data,
          ...(data.soft_goal ? {soft_goal: toBaseToken(data.soft_goal)} : {}),
          ...(data.hard_goal ? {hard_goal: toBaseToken(data.hard_goal)} : {}),
        },
        id,
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
    soft_goal: `${data.soft_goal} ${TOKEN_SYMBOL}`,
    hard_goal: `${data.hard_goal} ${TOKEN_SYMBOL}`,
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
