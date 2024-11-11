import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';

export const getProjectDetails = async (id: string) => {
  const projectParams = {
    include: {
      users_permissions_user: ['email'],
      images: ['*'],
    },
  };
  
  const artistParams = {
    include: {
      avatar: ['*'],
    },
    filters: {
      users_permissions_user: '',
    },
  };

  let project = {attributes: {}};
  let artist = {attributes: {}};
  try {
    const data = await apiClient(`${ENDPOINTS.PROJECTS}/${id}`, {params: projectParams});
    if (Array.isArray(data?.data)) {
      project = data?.data[0];
    } else if (data?.data?.attributes) {
      project = data?.data;
    }

    if (project.attributes?.users_permissions_user?.data.id) {
      artistParams.filters.users_permissions_user = project.attributes?.users_permissions_user?.data.id;
      const data = await apiClient(ENDPOINTS.PROFILES, {params: artistParams});
      if (data?.data?.length) {
        artist = data?.data[0];
      }
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  return {
    project,
    artist,
  };
};
