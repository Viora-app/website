import React, {FC} from 'react';

import {Params} from '@/app/config/types';
import {publishProject} from '@/app/actions/publishProject';
import {SafeArea} from '@/app/components/Elements';
import PublishProject from '@/app/components/PublishProject';
import {getProjectDetails} from '@/app/actions/getProjectDetails';
import {getProjectContributionTier} from '@/app/actions/getProjectContributionTiers';
import {fromBaseToken} from '@/app/utils/formatters';

const ProjectPublishScreen: FC<{params: Params<{id: number}>}> = async ({params}) => {
  const awaitedParams = await params;
  const projectId = awaitedParams.id;
  const {artist, project} = await getProjectDetails(projectId);
  const contributionTiers = await getProjectContributionTier(projectId);

  const tiers = contributionTiers.reduce((acc, item, index) => {
    acc[`contribution_tier_#${index + 1}`] = {
      name: item.attributes.name,
      amount: fromBaseToken(item.attributes.amount, 2, true),
    };
    return acc;
  }, {});

  const data = {
    project_name: project.attributes.name,
    project_summary: project.attributes.summary,
    artist_name: [artist.attributes.first_name, artist.attributes.last_name].join(' '),
    ...tiers,
  };

  return (
    <SafeArea>
      <PublishProject
        data={data}
        projectId={projectId}
        onPublish={publishProject}
      />
    </SafeArea>
  );
};

export default ProjectPublishScreen;
