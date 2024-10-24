import type {ImageData, ImageFormats, Project} from '../Projects/types';
import type {FileEvent} from '../Profile/types';
import type {FetchStatus} from '../../config/types';

export interface ProjectDetailsProps {
  id: string;
  name: string;
  summary: string;
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
  style: string;
}

export interface ImageItemProps {
  index: number;
  image: FileEvent;
  style?: string;
  disabled: boolean;
  onRemove: (index: number) => Promise<void>;
  onAdd: () => Promise<void>;
}

export interface GalleryProps {
  images: ImageData[];
  id: string;
  refresh: () => Promise<void>;
}

export interface ArtistShareProp {
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
