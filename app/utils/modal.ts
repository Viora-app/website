import {FetchStatus} from '../config/types';
import successImage from '../../public/images/success.png';
import errorImage from '../../public/images/error.png';
import {Feedback, FeedbackFnReturn} from './types';

export const finalMessages = (feedback: Feedback):FeedbackFnReturn  => {
  if (feedback.status === FetchStatus.success) {
    return {
      title: 'Success!',
      description: feedback.message ?? 'That was successful.',
      image: successImage,
    };
  }
  return {
    title: 'Error!',
    description: feedback.message || 'Something went wrong.',
    image: errorImage,
  };
};
