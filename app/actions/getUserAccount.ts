import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';

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
