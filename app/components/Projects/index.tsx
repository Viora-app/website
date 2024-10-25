import React, {useState} from 'react';
import {View} from '../Polyfills';

import {ENDPOINTS} from '../../config/endpoints';
import {useGetData} from '../../hooks/useQuery';
import {calculateItemsToDisplay} from '../../utils/helpers';
import ScreenNotFound from '../NotFound/Screen';
import ScreenLoading from '../Loading';
import {ProjectsHeader} from '../SectionHeader/Named';
import ListFooter from '../ListFooter';
import Project from './Project';
const params = {
  include: {
    users_permissions_user: ['email'],
    images: ['*'],
  },
};

const Projects = () => {
  const [displaySize, setDisplaySize] = useState(0);
  const {data, isLoading, loadMore, refresh} = useGetData(
    ENDPOINTS.PROJECTS,
    params,
  );
  const styles = {};

  const onRefresh = async () => {
    await refresh();
  };

  if (isLoading && !data?.data.length) {
    return <ScreenLoading />;
  }

  if (!data?.data.length) {
    return <ScreenNotFound />;
  }

  return (
    <View style={styles.wrapper}>
      {
        data?.data.map((item) => (
          <Project item={item} />
        ))
      }
      {
        data?.length > displaySize ? (
          <ListFooter isLoading={isLoading} />
        ) : null
      }
    </View>
  );
};

export default Projects;
