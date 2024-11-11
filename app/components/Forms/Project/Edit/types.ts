import {SongAttributes, FetchStatus} from '@/app/config/types';
import {ProjectAttrs} from '../../../Projects/types';

export interface EditProjectFormProps {
  projectId?: number;
}

export interface CreateProjectReviewProps {
  data: Partial<ProjectAttrs>;
}

export interface EditProjectReviewProps {
  data: Partial<ProjectAttrs>;
  projectId: number;
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}

export interface ConfirmProps {
  anchor: SongAttributes;
  onDone: (feedback: Feedback) => void;
}
