'use client'

import React, {FC} from 'react';
import {ScrollView, Text, View} from '../Polyfills';
import {useRouter} from 'next/navigation';

import {Project} from '../Projects/types';
import {ENDPOINTS} from '../../config/endpoints';
import {useGetData} from '../../hooks/useQuery';
import {IconButton} from '../Elements';
import Gallery from '../ProjectGallery';
import Deadline from './Deadline';
import Artist from './Artist';
import Actions from './Actions';
import NotFound from '../NotFound/Screen';
import Loading from '../Loading';
import FundingProgress from './FundingProgress';
import {ProjectDetailsProps} from './types';

const projectParams = {
  include: {
    users_permissions_user: ['email'],
    images: ['*'],
  },
};

const ProjectDetails: FC<ProjectDetailsProps> = ({id, ...restProps}) => {
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
        data?.data?.attributes?.users_permissions_user?.data.id,
    },
  };
  const {data: artist} = useGetData(ENDPOINTS.PROFILES, artistParams);
  const {back: goBack} = useRouter();

  const gotBack = () => {
    goBack();
  };

  if (id && !isLoading && data?.data?.id != id) {
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
    <ScrollView>
      <View>
        <IconButton
          onPress={gotBack}
          iconSize={24}
          iconName="cross"
        />
      </View>
      <Gallery
        images={images?.data || undefined}
        id={data?.data.id}
        projectStatus={data?.data.attributes.status}
        ownerId={data?.data?.attributes?.users_permissions_user?.data.id}
        refresh={refresh}
      />
      <Text>
        {restProps.name ?? name}
      </Text>
      <Text>
        {restProps.summary ?? summary}
      </Text>
      <Deadline date={deadline} />
      <Text>{description}</Text>
      <Artist data={artist?.data[0]?.attributes ?? {}} />
      <Text>
        By supporting her, you are not just funding the music—you are becoming a
        part of the creative journey!
      </Text>
      <FundingProgress
        currentFunding={current_funding}
        softGoal={soft_goal}
        hardGoal={hard_goal}
      />
      <Actions
        project={data?.data}
        owner={artist?.data[0] ?? {}}
        refresh={refresh}
      />
      <View />
    </ScrollView>
  );
};

export default ProjectDetails;
