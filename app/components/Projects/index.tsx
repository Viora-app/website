import React from 'react';

import {ScrollView} from '../Polyfills';
import {ENDPOINTS} from '../../config/endpoints';
import {useGetData} from '../../hooks/useQuery';
import ScreenNotFound from '../NotFound/Screen';
import ScreenLoading from '../Loading';
import Project from './Project';
const params = {
  include: {
    users_permissions_user: ['email'],
    images: ['*'],
  },
};

const Projects = () => {
  const {data, isLoading} = useGetData(
    ENDPOINTS.PROJECTS,
    params,
  );

  if (isLoading && !data?.data.length) {
    return <ScreenLoading />;
  }

  if (!data?.data.length) {
    return <ScreenNotFound />;
  }

  return (
    <ScrollView>
      {
        data?.data.map((item) => (
          <Project item={item} key={item.id} />
        ))
      }
    </ScrollView>
  );
};

export default Projects;
