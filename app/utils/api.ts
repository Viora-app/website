import {ENDPOINTS} from '@/app/config/endpoints';
import type {ApiOptions, QueryParams} from './types';

const IMAGE_PROTOCOL = process.env.NEXT_PUBLIC_IMAGE_PROTOCOL;
const IMAGE_HOSTNAME = process.env.NEXT_PUBLIC_IMAGE_HOSTNAME;
const IMAGE_PORT = process.env.NEXT_PUBLIC_IMAGE_PORT;

const baseURl = `${IMAGE_PROTOCOL}://${IMAGE_HOSTNAME}${IMAGE_PORT ? ':' + IMAGE_PORT : ''}`

export const getApiUrl = () => baseURl;

const constructQueryParams = (params: QueryParams) => {
  const queryParams: Record<string, string | number | boolean> = {};

  // Flattening include params for population
  if (params.include) {
    Object.entries(params.include).forEach(([key, value]) => {
      value.forEach((field: string) => {
        if (field === '*') {
          queryParams[`populate[${key}][populate]`] = '*';
        } else {
          const index = value.indexOf(field);
          queryParams[`populate[${key}][fields][${index}]`] = field;
        }
      });
    });
  }

  // Handling filters
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      queryParams[`filters[${key}]`] = value;
    });
  }

  // Handling pagination
  if (params.pagination) {
    Object.entries(params.pagination).forEach(([key, value]) => {
      queryParams[`pagination[${key}]`] = value;
    });
  }

  // Converting queryParams object to a query string
  const query = Object.keys(queryParams)
    .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
    .join('&');

  return query;
};

export const apiClient = async (endpoint: string, options: ApiOptions = {}) => {
  const query = constructQueryParams(options?.params ?? {});

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}?${query}`.replace('//', '/'), options);

  if (!res.ok) {
    throw new Error(`API call failed: ${res.status}`);
  }

  return await res.json();
};

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

// @todo not used yet
export const addProjectPhoto = async (projectId: string, data: unknown) => {
  const project = await apiClient(`${ENDPOINTS.PROJECTS}/${projectId}`, {method: 'PUT', data});
};

export const getUserContributions = async (id: string | undefined) => {
  let contributions = [];
  if (id) {
    try {
      const result = await apiClient(ENDPOINTS.CONTRIBUTIONS, {
        params: {
          filters: {users_permissions_user: id},
          include: {
            project: ['*'],
            contribution_tier: ['*'],
          },
        }
      });
      if (Array.isArray(result.data)) {
        contributions = result.data;
      }
    } catch (error) {
      console.error('Failed to delete photo:', error);
    }
  }

  return contributions;
};

export const getUserAccount = async () => {
  let account = {};

  try {
    const result = await apiClient(ENDPOINTS.ME);
    account = result;
  } catch (error) {
    console.error('Failed to delete photo:', error);
  }

  return account;
};

export const logout = async () => {
  const result = {success: false};

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/disconnect`);
  
    if (!res.ok) {
      throw new Error(`API call failed: ${res.status}`);
    }
  
    await res.json();
    result.success = true;
  } catch (error) {
    console.error('Failed to logout:', error);
  }

  return result;
};

export const createProject = async (data) => {
  const result = {
    success: false,
    error: '',
  };

  try {
    const result = await apiClient(ENDPOINTS.PROJECTS, {
      method: 'POST',
      data,
    });

    console.log('createProject', createProject);
  } catch (error) {
    console.error('Failed to create project:', error);
  }

  return result;
};
