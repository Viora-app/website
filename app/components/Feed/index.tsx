import React, {FC} from 'react';

// import {ENDPOINTS} from '@/app/config/endpoints';
// import {useGetData} from '@/app/hooks/useQuery';
import {ScrollView} from '@/app/components/Polyfills';
import ScreenNotFound from '../NotFound/Screen';
import ScreenLoading from '../Loading';
import Project from './Project';
import Content from './Content';

const Feed: FC = ({data, isLoading}) => {
  if (isLoading && !data?.data.length) {
    return <ScreenLoading />;
  }

  if (!data?.data.length) {
    return <ScreenNotFound redirectTo={false} />;
  }

  return (
    <ScrollView className="p-6">
      {
        data?.data.map((item) => {
          if (item?.type === 'project') {
            return <Project data={item} key={`feed-proj-${item.id}`} />;
          }
          return <Content data={item} key={`feed-cntnt-${item.id}`} />;
        })
      }
    </ScrollView>
  );
};

export default Feed;