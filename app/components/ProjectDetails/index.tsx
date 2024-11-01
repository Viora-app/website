'use client'

import React, {FC} from 'react';

import {Project} from '../Projects/types';
import {ENDPOINTS} from '../../config/endpoints';
import {useGetData} from '../../hooks/useQuery';
import {ScrollView, Span, H2, H3, H4, View} from '../Polyfills';
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
      <Gallery
        images={images?.data || undefined}
        id={data?.data.id}
        projectStatus={data?.data.attributes.status}
        ownerId={data?.data?.attributes?.users_permissions_user?.data.id}
        refresh={refresh}
      />
      <View className="p-4">
        <H2>
          {name}
        </H2>
        <H4 className="mb-4 !font-light">
          {summary}
        </H4>
        <Deadline date={deadline} />
        <H4 className="!font-light">{description}</H4>
        <Artist data={artist?.data[0]?.attributes ?? {}} />
        <H2 className="!font-light pt-4 pb-6">
          By supporting her, you are not just funding the music—you are becoming a
          part of the creative journey!
        </H2>
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
      </View>
    </ScrollView>
  );
};

export default ProjectDetails;
