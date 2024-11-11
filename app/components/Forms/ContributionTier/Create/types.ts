import {SongAttributes, FetchStatus} from '@/app/config/types';
import {ContributionTierAttrs} from '../../../Projects/types';

export interface ContributionTier {
  projectId: number;
}

export interface CreateContributionTierReviewProps {
  data: Partial<ContributionTierAttrs>;
  projectId: number;
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}

export interface ConfirmProps {
  anchor: SongAttributes;
  onDone: (feedback: Feedback) => void;
}
