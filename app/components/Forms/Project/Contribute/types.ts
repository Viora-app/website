import {FetchStatus} from '@/app/config/types';
import {Account} from '@/app/config/types';
import {Project} from '@/app/components/Projects/types';

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
  project: Project;
  artist: Account;
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
