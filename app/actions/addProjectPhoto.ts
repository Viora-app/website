import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';

// @todo not used yet
export const addProjectPhoto = async (projectId: string, data: unknown) => {
  let result = {};
  try {
    const project = await apiClient(`${ENDPOINTS.PROJECTS}/${projectId}`, {method: 'PUT', data});
    console.log(project);
    result = project;
  } catch (error) {
    console.error('Failed to delete photo:', error);
  }

  return result;
};
