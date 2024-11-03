import type {ImageData, ImageFormats, Project} from '../Projects/types';
import type {FileEvent} from '../Profile/types';
import type {FetchStatus} from '../../config/types';

export interface ProjectDetailsProps {
  id: string;
}

export interface ArtistProps {
  data: {
    first_name: string;
    last_name: string;
    avatar: {
      data: {
        attributes: {
          formats: ImageFormats;
        };
      } | null;
    };
    instagram: string;
    twitter: string;
    twitch: string;
  };
}

export interface DeadlineProps {
  date: string;
}

export interface FundingProgressProps {
  currentFunding: number;
  softGoal: number;
  hardGoal: number;
}

export interface ArtistShareProp {
  id: number;
  attributes: {
    formats?: ImageFormats;
    first_name: string;
    last_name: string;
  };
}
export interface ActionsProps {
  owner: ArtistShareProp;
  project: Project;
  refresh: () => Promise<void>;
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}
