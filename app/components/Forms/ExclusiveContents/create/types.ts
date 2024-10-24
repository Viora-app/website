import {SongAttributes, FetchStatus} from '../../../../config/types';
import {ContributionTier} from '../../../Projects/types';

export interface PostExclusiveContentsFormProps {
  style?: object;
  projectId: string;
}
export interface FormData {
  title: string;
  description: string;
  accessible_tiers: number[];
}

export interface ExclusiveContent {
  id: number;
  attributes: FormData;
}

export interface PostExclusiveContentsReviewProps {
  data: {
    title: string;
    description: string;
    accessible_tiers: ContributionTier[];
  };
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}

export interface ConfirmProps {
  anchor: SongAttributes;
  onDone: (feedback: Feedback) => void;
}

export interface AccessibleTiersSelectProps {
  tiers: ContributionTier[];
  onSelect: (item: ContributionTier) => void;
  selection: number[];
}
