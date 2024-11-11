import {cookies} from 'next/headers';
import {apiBaseUrl} from '@/app/config/endpoints';
import {constructQueryParams} from './queryParams';
import type {ApiOptions} from './types';

export const apiClient = async (endpoint: string, options: ApiOptions = {}) => {
  const query = constructQueryParams(options?.params ?? {});
  const awaitedCookies = await cookies();
  const jwt = awaitedCookies.get('auth-jwt')?.value;

  // Set up headers
  const headers = {
    'Content-Type': 'application/json',
    ...(jwt && { Authorization: `Bearer ${jwt}` }),
    ...options.headers,
  };

  const res = await fetch(`${apiBaseUrl}${endpoint}?${query}`.replace('//', '/'), {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(`API call failed: ${res.status}`);
  }

  return await res.json();
};
