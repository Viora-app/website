import {SongAttributes, FetchStatus} from '../../../../config/types';
import {Profile} from '../../../../context/accountContext/types';

export interface ProfileEditFormProps {
  style?: object;
}

export interface ProfileEditReviewProps {
  data: Partial<Omit<Profile, 'avatar'>>;
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}

export interface ConfirmProps {
  anchor: SongAttributes;
  onDone: (feedback: Feedback) => void;
}
