'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';

export const publishProject = async (projectId: number) => {
  const result = {
    success: false,
    error: '',
  };

  try {
    const res = await apiClient(`${ENDPOINTS.PROJECTS}/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify({
        data: {status: 'live'}
      }),
    });

    if (res.data) {
      result.success = true;
    } else {
      result.error = 'Failed to publish the project';
    }
  } catch (error) {
    console.error('Failed to publish the project:', error);
    result.error = 'Failed to publish the project.';
  }

  return result;
};