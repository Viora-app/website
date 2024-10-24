import {Account} from '../../context/accountContext/types';
import {ArtistShareProp} from '../ProjectDetails/types';
import {Project} from '../Projects/types';

export interface PublishedProjectOwnerProps {
  project: Project;
  account?: Account;
  artist: ArtistShareProp;
}
export interface FullDataComponentProps {
  project: Project;
  account?: Account;
  artist: ArtistShareProp;
  refresh: () => Promise<void>;
}

export interface SuccessfulProjectOwnerProps {
  projectId: string;
}

export interface DefaultProjectStatusProps {
  projectId: string;
  refresh: () => Promise<void>;
}
