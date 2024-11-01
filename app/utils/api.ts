import axios from 'axios';

import {API_SUFFIX} from '../config/network';
import {ENDPOINTS} from '../config/endpoints';
import type {ProfileResponse} from '../context/accountContext/types';

const baseURl = `${process.env.NEXT_PUBLIC_IMAGE_PROTOCOL}://${process.env.NEXT_PUBLIC_IMAGE_HOSTNAME}${process.env.NEXT_PUBLIC_IMAGE_PORT ? ':' + process.env.NEXT_PUBLIC_IMAGE_PORT : ''}`
const api = axios.create({
  baseURL: `${baseURl}/${API_SUFFIX}`,
});

export const getData = async (
  endpoint: string,
  params: unknown = {},
  jwt: string | undefined = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTczMDAyMDI4MCwiZXhwIjoxNzMyNjEyMjgwfQ.HPD171NrQ1cUvVv5l4lGuBTQfrqeeSeHlqRvhqW5yMo',
) => {
  const response = await api.get(endpoint, {
    params,
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const postData = async (
  endpoint: string,
  data: unknown,
  jwt: string | undefined,
) => {
  const response = await api.post(endpoint, data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const patchData = async (
  endpoint: string,
  data: unknown,
  jwt: string | undefined,
) => {
  const isFormData = data?.data instanceof FormData;
  const body = isFormData ? data.data : data;
  const response = await api.put(endpoint, body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
    },
  });
  return response.data;
};

export const deleteData = async (endpoint: string, jwt: string | undefined) => {
  const response = await api.delete(endpoint, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const authenticate = async (identifier: string, password: string) => {
  try {
    const response = await api.post('/auth/local', {
      identifier,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error during authentication', error);
    throw error;
  }
};

export const register = async (
  email: string,
  password: string,
  username: string,
) => {
  try {
    const response = await api.post('/auth/local/register', {
      email,
      password,
      username,
    });
    return response.data;
  } catch (error) {
    console.error('Error during registration', error);
    throw error;
  }
};

export const getProfile = async (jwt: string): Promise<ProfileResponse> => {
  const response = await api.get('/profiles/me', {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const getSongFromPlatform = async (
  platform: string,
  id: string,
  jwt: string,
) => {
  try {
    const response = await api.get(
      `${ENDPOINTS.SONG_FETCH}/${platform}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (e) {
    console.log('e', e);
    return {
      error: 'Not found',
    };
  }
};
