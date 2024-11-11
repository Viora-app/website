
import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';

export const getFeed = async () => {
  let result;
  try {
    console.log('Action: getFeed');
    const data = await apiClient(ENDPOINTS.FEED);
    result = data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    // We can even redirect to login if unauthorized
  }

  return result;
};