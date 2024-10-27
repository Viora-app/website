import {SongAttributes, FetchStatus} from '../../../../config/types';
import {ProjectAttrs} from '../../../Projects/types';

export interface EditProjectFormProps {
  id?: string;
}

export interface CreateProjectReviewProps {
  data: Partial<ProjectAttrs>;
}

export interface EditProjectReviewProps {
  data: Partial<ProjectAttrs>;
  id: string;
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}

export interface ConfirmProps {
  anchor: SongAttributes;
  onDone: (feedback: Feedback) => void;
}
