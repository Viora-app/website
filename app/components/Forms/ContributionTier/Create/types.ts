import {SongAttributes, FetchStatus} from '../../../../config/types';
import {ContributionTierAttrs} from '../../../Projects/types';

export interface ContributionTier {
  style?: object;
  id: string;
}

export interface CreateContributionTierReviewProps {
  data: Partial<ContributionTierAttrs>;
  project: string;
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}

export interface ConfirmProps {
  anchor: SongAttributes;
  onDone: (feedback: Feedback) => void;
}
