import {FetchStatus} from '../config/types';
import successImage from '../assets/images/success.png';
import errorImage from '../assets/images/error.png';
import {Feedback} from './types';

export const finalMessages = (feedback: Feedback) => {
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
