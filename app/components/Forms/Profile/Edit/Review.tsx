import React, {useCallback, useState} from 'react';
import {View, Keyboard} from 'react-native';

import {useTheme} from '../../../../hooks/useTheme';
import {useAccount} from '../../../../hooks/useAccount';
import {useModal} from '../../../../hooks/useModal';
import {FetchStatus} from '../../../../config/types';
import {finalMessages} from '../../../../utils/modal';
import {ButtonThemes} from '../../../Elements/Button/types';
import FormSummary from '../../../FormElements/GenericSummary';
import {Button} from '../../../Elements';
import type {ProfileEditReviewProps, Feedback} from './types';
import themedStyles from './styles';

const EditProfileReview = ({data}: ProfileEditReviewProps) => {
  const {update} = useAccount();
  const {show} = useModal();
  const styles = useTheme(themedStyles);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onDone = useCallback(
    (feedback: Feedback) => {
      show(finalMessages(feedback));
    },
    [show],
  );

  const onSubmit = async () => {
    setIsSubmitted(true);
    Keyboard.dismiss();
    const response = await update(data);
    onDone({
      status: response.success ? FetchStatus.success : FetchStatus.error,
      message: response.success ? '' : 'Error updating your profile.',
    });
  };

  return (
    <View style={styles.reviewWrapper}>
      <FormSummary data={data} />
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

export default EditProfileReview;
