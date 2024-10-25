import axios from 'axios';
import {API_URL} from '@env';
import {API_SUFFIX} from '../config/network';
import {ENDPOINTS} from '../config/endpoints';
import type {ProfileResponse} from '../context/accountContext/types';

const api = axios.create({
  baseURL: `${API_URL}/${API_SUFFIX}`,
});

export const getData = async (
  endpoint: string,
  params: any = {},
  jwt: string | undefined,
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
  data: any,
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
  data: any,
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
