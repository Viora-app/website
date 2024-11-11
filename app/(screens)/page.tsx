import React from 'react';
import {cookies} from 'next/headers';

import {Routes} from '@/app/config/routes';
import {getFeed} from '@/app/actions/getFeed';
import {Link} from '../components/Polyfills';
import {SafeArea, Icon} from '@/app/components/Elements';
import Feed from '@/app/components/Feed';

const FeedScreen = async () => {
  const data = await getFeed();

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