import React, {FC} from 'react';

import {SafeArea} from '@/app/components/Elements';
import ProjectDetails from '@/app/components/ProjectDetails';

const ProjectDetailsScreen: FC = async ({params}) => {
  const awaitedParams = await params;

  return (
    <SafeArea safeArea>
      <ProjectDetails id={awaitedParams.id} />
    </SafeArea>
  );
}

export default ProjectDetailsScreen;
