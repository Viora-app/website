'use client'

import React, {FC} from 'react';

import {ENDPOINTS} from '@/app/config/endpoints';
import {useGetData} from '@/app/hooks/useQuery';
import {ScrollView, H2, H3, Span, View} from '@/app/components/Polyfills';
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

const ProjectDetails: FC<ProjectDetailsProps> = ({id}) => {
  const {data, isLoading, refresh} = useGetData(
    `${ENDPOINTS.PROJECTS}/${id}`,
    projectParams,
  );
  let projectData = {attributes: {}};
  if (Array.isArray(data?.data)) {
    projectData = data?.data[0];
  } else if (data?.data?.attributes) {
    projectData = data?.data;
  }
  const artistParams = {
    include: {
      avatar: ['*'],
    },
    filters: {
      users_permissions_user: projectData.attributes.users_permissions_user?.data.id,
    },
  };
  const {data: artist} = useGetData(ENDPOINTS.PROFILES, artistParams);
  const artistData = artist?.data?.length ? artist?.data[0] : {attributes: {}};

  if (id && !isLoading && projectData.id != id) {
    return <NotFound />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView>
      <Gallery
        images={projectData.attributes.images?.data || undefined}
        id={projectData.id}
        projectStatus={projectData.attributes.status}
        ownerId={projectData.attributes.users_permissions_user?.data.id}
        refresh={refresh}
      />
      <View className="p-4">
        <H2 className="dark:!text-primaryStrong">
          {projectData.attributes.name}
        </H2>
        <Span className="mb-4 !font-light dark:!text-neutralStrong">
          {projectData.attributes.summary}
        </Span>
        <Deadline date={projectData.attributes.deadline} />
        <Span className="!font-light dark:!text-neutralStrong">{projectData.attributes.description}</Span>
        <Artist data={artistData.attributes} />
        <H3 className="!font-light pt-4 pb-6 dark:!text-neutralStrong">
          By supporting her, you are not just funding the music—you are becoming a
          part of the creative journey!
        </H3>
        <FundingProgress
          currentFunding={projectData.attributes.current_funding}
          softGoal={projectData.attributes.soft_goal}
          hardGoal={projectData.attributes.hard_goal}
        />
        <Actions
          project={projectData}
          owner={artistData}
          refresh={refresh}
        />
      </View>
    </ScrollView>
  );
};

export default ProjectDetails;
