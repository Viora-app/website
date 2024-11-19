import {FetchStatus} from '@/app/config/types';

export interface ContributionTier {
  id: string;
  attributes: {
    name: string;
    description: string;
    rewards: string;
    amount: number;
  };
}

export interface ContributeProps {
  projectId: number;
  options: ContributionTier[];
}

export interface ContributeOptionProps {
  data: ContributionTier;
  selected: boolean;
  onSelected: (id: string) => void;
}

export interface ContributionReviewProps {
  id: string;
  projectId: string;
  data: {
    name: string;
    rewards: string;
    amount: number;
  };
  refresh: () => Promise<void>;
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}
