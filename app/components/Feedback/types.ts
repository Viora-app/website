import {FetchStatus} from '../../config/types';

export interface FeedbackProps {
  status: FetchStatus;
  message?: string;
}
