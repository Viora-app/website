import React, {useCallback, useState} from 'react';
import {View} from '../../../Polyfills';

import {useAccount} from '../../../../hooks/useAccount';
import {useModal} from '../../../../hooks/useModal';
import {FetchStatus} from '../../../../config/types';
import {finalMessages} from '../../../../utils/modal';
import {ButtonThemes} from '../../../Elements/Button/types';
import FormSummary from '../../../FormElements/GenericSummary';
import {Button} from '../../../Elements';
import type {ProfileEditReviewProps, Feedback} from './types';

const EditProfileReview = ({data}: ProfileEditReviewProps) => {
  const {update} = useAccount();
  const {show} = useModal();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onDone = useCallback(
    (feedback: Feedback) => {
      show(finalMessages(feedback));
    },
    [show],
  );

  const onSubmit = async () => {
    setIsSubmitted(true);
    // Keyboard.dismiss();
    const response = await update(data);
    onDone({
      status: response.success ? FetchStatus.success : FetchStatus.error,
      message: response.success ? '' : 'Error updating your profile.',
    });
  };

  return (
    <View>
      <FormSummary data={data} />
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

export default EditProfileReview;
