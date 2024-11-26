import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';

// @todo not used yet
export const addProjectPhoto = async (projectId: number, body: FormData) => {
  let result = {};
  try {
    const project = await apiClient(`${ENDPOINTS.PROJECTS}/${projectId}`, {
      method: 'PUT',
      body,
    });
    result = project;
  } catch (error) {
    console.error('Failed to delete photo:', error);
  }

  return result;
};
