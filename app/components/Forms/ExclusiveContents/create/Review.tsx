import React, {FC, useCallback, useEffect, useState} from 'react';
import {View, Keyboard} from 'react-native';

import {useTheme} from '../../../../hooks/useTheme';
import {useModal} from '../../../../hooks/useModal';
import {usePostData} from '../../../../hooks/useQuery';
import {FetchStatus} from '../../../../config/types';
import {finalMessages} from '../../../../utils/modal';
import {ButtonThemes} from '../../../Elements/Button/types';
import {ENDPOINTS} from '../../../../config/endpoints';
import FormSummary from '../../../FormElements/GenericSummary';
import {Button} from '../../../Elements';
import type {PostExclusiveContentsReviewProps, Feedback} from './types';
import themedStyles from './styles';

const PostExclusiveContentsReview: FC<PostExclusiveContentsReviewProps> = ({
  data,
}) => {
  const {show} = useModal();
  const styles = useTheme(themedStyles);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const mutation = usePostData(ENDPOINTS.EXCLUSIVE_CONTENT);

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
          title: data.title,
          description: data.description,
          accessible_tiers: data.accessible_tiers.map(item => item.id),
          public_access: false, // Let's keep exclusive for now.
        },
      });
    } catch (e) {
      console.error('Error creating exclusive content:', e);
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

  const previewData = {
    title: data.title,
    description: data.description,
    accessible_to_tiers: data.accessible_tiers
      .map(item => item.attributes.name)
      .join(', '),
  };

  return (
    <View style={styles.reviewWrapper}>
      <FormSummary data={previewData} />
      <View style={styles.actionBar}>
        <Button
          title={isSubmitted ? 'Updating' : 'Create'}
          theme={ButtonThemes.primary}
          onPress={onSubmit}
          disabled={isSubmitted}
        />
      </View>
    </View>
  );
};

export default PostExclusiveContentsReview;
