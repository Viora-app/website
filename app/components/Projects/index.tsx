import React, {useState} from 'react';
import {FlatList, RefreshControl, View, LayoutChangeEvent} from 'react-native';

import {ENDPOINTS} from '../../config/endpoints';
import {useTheme} from '../../hooks/useTheme';
import {useGetData} from '../../hooks/useQuery';
import {calculateItemsToDisplay} from '../../utils/helpers';
import ScreenNotFound from '../NotFound/Screen';
import ScreenLoading from '../Loading';
import {ProjectsHeader} from '../SectionHeader/Named';
import ListFooter from '../ListFooter';
import Project from './Project';
import themedStyles from './styles';
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
  const styles = useTheme(themedStyles);

  const onRefresh = async () => {
    await refresh();
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    const calculatedItemsToDisplay = calculateItemsToDisplay(height);
    setDisplaySize(calculatedItemsToDisplay);
  };

  if (isLoading && !data?.data.length) {
    return <ScreenLoading />;
  }

  if (!data?.data.length) {
    return <ScreenNotFound />;
  }

  return (
    <View onLayout={handleLayout} style={styles.wrapper}>
      <FlatList
        data={data?.data}
        ListHeaderComponent={ProjectsHeader}
        renderItem={({item}) => <Project item={item} />}
        keyExtractor={item => item.id}
        ListFooterComponent={
          data?.length > displaySize ? (
            <ListFooter isLoading={isLoading} />
          ) : null
        }
        onEndReachedThreshold={0.4}
        onEndReached={loadMore}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Projects;
