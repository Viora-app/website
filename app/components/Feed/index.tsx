import React, {FC} from 'react';

import {ENDPOINTS} from '../../config/endpoints';
import {useGetData} from '../../hooks/useQuery';
import {ScrollView} from '../Polyfills';
import ScreenNotFound from '../NotFound/Screen';
import ScreenLoading from '../Loading';
import Project from './Project';
import Content from './Content';

const Feed: FC = () => {
  const {data, isLoading} = useGetData(ENDPOINTS.FEED);

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
            return <Project item={item} key={`feed-proj-${item.id}`} />;
          }
          return <Content item={item} key={`feed-cntnt-${item.id}`} />;
        })
      }
    </ScrollView>
  );
};

export default Feed;