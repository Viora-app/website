interface User {
  data: {
    id: string;
    attributes: {
      email: string;
    };
  };
}

export interface Image {
  id: string;
  attributes: {
    formats: {
      large: {
        url: string;
        name: string;
      };
      medium: {
        url: string;
        name: string;
      };
      small: {
        url: string;
        name: string;
      };
      thumbnail: {
        url: string;
        name: string;
      };
    };
  };
}

interface Images {
  data: Image[];
}

export enum ProjectType {
  Single = 'single',
  EP = 'ep',
  Album = 'album',
  MusicVideo = 'music_video',
}

export enum ProjectStatus {
  Live = 'live',
  Draft = 'draft',
  Successful = 'successful',
  Failed = 'failed',
}

export enum FeedType {
  Project = 'project',
  Content = 'content',
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

interface Owner {
  first_name: string;
  last_name: string;
  user_id: number;
  profile_id: number;
}

export interface ArtistProps {
  data: Owner;
}

export interface ExclusiveContentAttrs {
  media: unknown;
  project: string;
  public_access: boolean;
  accessibleTiers: string[];
  title: string;
  description: string;
}

export interface ProjectProps {
  item: ProjectAttrs & {
    id: number;
    current_funding: number;
    reaction_count: number;
    users_permissions_user: User;
    images: Images;
    owner: Owner;
    type: FeedType.Project;
  };
}

export interface ContentProps {
  item: ExclusiveContentAttrs & {
    id: number;
    reaction_count: number;
    owner: Owner;
    project: {
      name: string;
      id: string;
    };
    type: FeedType.Content;
  };
}

export interface ContributionTierAttrs {
  name: string;
  description: string;
  rewards: string;
  amount: number;
}

export interface LinkToProjectProps {
  name: string;
  id: string;
}

export interface MetaProps {
  reactionCount?: number;
  backers?: number;
  type: FeedType;
  status?: ProjectStatus;
}