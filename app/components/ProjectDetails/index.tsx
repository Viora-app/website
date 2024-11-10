import React, {FC} from 'react';

import {ENDPOINTS} from '@/app/config/endpoints';
import {getProjectDetails} from '@/app/utils/api';
import {ScrollView, H2, H3, Span, View} from '@/app/components/Polyfills';
import Gallery from '../ProjectGallery';
import Deadline from './Deadline';
import Artist from './Artist';
// import Actions from './Actions';
import NotFound from '../NotFound/Screen';
import FundingProgress from './FundingProgress';
import {ProjectDetailsProps} from './types';



const ProjectDetails: FC<ProjectDetailsProps> = async ({id}) => {
  let {artist, project} = await getProjectDetails(id);

  const refresh = async () => {
    const result = await getProjectDetails(id);
    artist = result.artist;
    project = result.project;
  };

  if (id && project.id != id) {
    return <NotFound />;
  }

  return (
    <ScrollView>
      <Gallery
        images={project.attributes.images?.data || undefined}
        id={project.id}
        projectStatus={project.attributes.status}
        ownerId={project.attributes.users_permissions_user?.data.id}
        refresh={refresh}
      />
      <View className="p-4">
        <H2 className="dark:!text-primaryStrong">
          {project.attributes.name}
        </H2>
        <Span className="mb-4 !font-light dark:!text-neutralStrong">
          {project.attributes.summary}
        </Span>
        <Deadline date={project.attributes.deadline} />
        <Span className="!font-light dark:!text-neutralStrong">{project.attributes.description}</Span>
        <Artist data={artist.attributes} />
        <H3 className="!font-light pt-4 pb-6 dark:!text-neutralStrong">
          By supporting her, you are not just funding the music—you are becoming a
          part of the creative journey!
        </H3>
        <FundingProgress
          currentFunding={project.attributes.current_funding}
          softGoal={project.attributes.soft_goal}
          hardGoal={project.attributes.hard_goal}
        />
        {/* <Actions
          project={project}
          owner={artist}
          refresh={refresh}
        /> */}
      </View>
    </ScrollView>
  );
};

export default ProjectDetails;
