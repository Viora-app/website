interface User {
  data: {
    id: string;
    attributes: {
      email: string;
    };
  };
}

export enum ImageSizes {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
  Thumbnail = 'thumbnail',
}

export interface ImageFormats {
  [ImageSizes.Large]: {
    url: string;
    name: string;
  };
  [ImageSizes.Medium]: {
    url: string;
    name: string;
  };
  [ImageSizes.Small]: {
    url: string;
    name: string;
  };
  [ImageSizes.Thumbnail]: {
    url: string;
    name: string;
  };
}

export interface ImageData {
  id: string;
  attributes: {
    formats: ImageFormats;
  };
}

interface Images {
  data: ImageData[];
}

export enum ProjectType {
  Single = 'single',
  EP = 'EP',
  Album = 'Album',
  MusicVideo = 'Music Video',
}

export enum ProjectStatus {
  Published = 'published',
  Draft = 'draft',
  Successful = 'successful',
  soldOut = 'soldOut',
  Failing = 'failing',
  Failed = 'failed',
  Withdrawn = 'withdrawn',
}

export interface ProjectAttrs {
  name: string;
  summary: string;
  description: string;
  project_type: ProjectType;
  planned_release_date: string;
  soft_goal: number;
  deadline: string;
  hard_goal: number;
}

export interface Project {
  id: string;
  attributes: ProjectAttrs & {
    current_funding: number;
    reaction_count: number;
    users_permissions_user: User;
    images: Images;
    status?: ProjectStatus;
  };
}

export interface ProjectProps {
  item: Project;
}

export interface ContributionTierAttrs {
  name: string;
  description: string;
  rewards: string;
  amount: number;
}

export interface ContributionTier {
  id: number;
  attributes: ContributionTierAttrs;
}
