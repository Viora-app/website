
import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';

export const deleteProjectPhoto = async (projectId: string, removedId: string, remainingIds: string[]) => {
  try {
    const data = JSON.stringify({images: remainingIds});
    const project = await apiClient(`${ENDPOINTS.PROJECTS}/${projectId}`, {method: 'PUT', data});
    await apiClient(`${ENDPOINTS.FILES}/${removedId}`, {method: 'DELETE'});

    return project;
  } catch (error) {
    console.error('Failed to delete photo:', error);
  }
};
