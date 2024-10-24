import React, {FC} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Project} from '../Projects/types';
import {ENDPOINTS} from '../../config/endpoints';
import {useGetData} from '../../hooks/useQuery';
import {useTheme} from '../../hooks/useTheme';
import {IconButton} from '../Elements';
import Gallery from '../ProjectGallery';
import Deadline from './Deadline';
import Artist from './Artist';
import Actions from './Actions';
import NotFound from '../NotFound/Screen';
import Loading from '../Loading';
import FundingProgress from './FundingProgress';
import {ProjectDetailsProps} from './types';
import themedStyles from './styles';

const projectParams = {
  include: {
    users_permissions_user: ['email'],
    images: ['*'],
  },
};

const ProjectDetails: FC<ProjectDetailsProps> = ({id, ...restProps}) => {
  const styles = useTheme(themedStyles);
  const {data, isLoading, refresh} = useGetData(
    `${ENDPOINTS.PROJECTS}/${id}`,
    projectParams,
  );
  const artistParams = {
    include: {
      avatar: ['*'],
    },
    filters: {
      users_permissions_user:
        data?.data?.attributes.users_permissions_user.data.id,
    },
  };
  const {data: artist} = useGetData(ENDPOINTS.PROFILES, artistParams);
  const navigation = useNavigation();

  const gotBack = () => {
    navigation.goBack();
  };

  if (id && !isLoading && data?.data?.id !== id) {
    return <NotFound />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const {
    attributes: {
      name,
      summary,
      description,
      images,
      soft_goal,
      hard_goal,
      deadline,
      current_funding,
      // planned_release_date, @todo design this
    },
  } = data?.data as Project;

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.row, styles.header]}>
        <IconButton
          onPress={gotBack}
          style={styles.closeButton}
          iconSize={24}
          iconName="cross"
        />
      </View>
      <Gallery
        images={images?.data || undefined}
        id={data?.data.id}
        projectStatus={data?.data.attributes.status}
        ownerId={data?.data?.attributes.users_permissions_user.data.id}
        refresh={refresh}
      />
      <Text style={[styles.largest, styles.spacer]}>
        {restProps.name ?? name}
      </Text>
      <Text style={[styles.medium, styles.spacer]}>
        {restProps.summary ?? summary}
      </Text>
      <Deadline date={deadline} />
      <Text style={[styles.medium, styles.spacer]}>{description}</Text>
      <Artist data={artist?.data[0]?.attributes ?? {}} />
      <Text style={[styles.semi, styles.spacer]}>
        By supporting her, you're not just funding the music—you’re becoming a
        part of the creative journey!
      </Text>
      <FundingProgress
        currentFunding={current_funding}
        softGoal={soft_goal}
        hardGoal={hard_goal}
        style={styles.spacer}
      />
      <Actions
        project={data?.data}
        owner={artist?.data[0] ?? {}}
        refresh={refresh}
      />
      <View style={styles.spacer} />
    </ScrollView>
  );
};

export default ProjectDetails;
