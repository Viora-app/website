import React, {useCallback, useEffect, useState} from 'react';
import {View, Keyboard} from 'react-native';
import {TOKEN_SYMBOL} from '@env';

import {useTheme} from '../../../../hooks/useTheme';
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
import themedStyles from './styles';

const CreateProjectReview = ({data}: CreateProjectReviewProps) => {
  const {show} = useModal();
  const styles = useTheme(themedStyles);
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
    Keyboard.dismiss();
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
