import type {ImageData, ImageFormats, Project, ProjectStatus} from '../Projects/types';
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
}

export interface ReadableImageProps {
  index: number;
  image: {
    attributes: {
      formats: ImageFormats;
    };
  };
}

export interface EditableImageProps {
  index: number;
  image: FileEvent;
  disabled: boolean;
  onRemove: (index: number) => Promise<void>;
  onAdd: () => Promise<void>;
}

export interface GalleryReadableProps {
  images: ImageData[];
  id: string;
}

export interface GalleryEditableProps {
  images: ImageData[];
  id: string;
  refresh: () => Promise<void>;
}

export interface GalleryProps {
  images: ImageData[];
  id: string;
  ownerId: number;
  projectStatus: ProjectStatus;
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
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}
