import React from 'react';

import {SafeArea} from '@/app/components/Elements';
import Feed from '@/app/components/Feed';
import {Icon} from '@/app/components/Elements';
import {ENDPOINTS} from '@/app/config/endpoints';
import {Routes} from '@/app/config//routes';
import {apiClient} from '@/app/utils/api';
import { Link } from '../components/Polyfills';

const FeedScreen = async () => {
  let data;
  try {
    data = await apiClient(ENDPOINTS.FEED);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    // Handle the error (e.g., redirect to login if unauthorized)
  }

  return (
    <SafeArea>
      <Feed data={data} />
      <Link
        to={{screen: Routes.CreateProjects}}
        className="absolute right-8 bottom-8 w-[44px] h-[44px] rounded-3xl bg-assureStrong p-2 shadow-lg hover:shadow-xl cursor-pointer"
      >
        <Icon
          name="plus"
          size={28}
          color="#fff"
        />
      </Link>
    </SafeArea>
  );
};

export default FeedScreen;