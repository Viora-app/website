import React, {FC} from 'react';

import {SafeArea} from '../../components/Elements';
import ProjectDetails from '../../components/ProjectDetails';

const ProjectDetailsScreen: FC = ({route: {params}}) => (
  <SafeArea safeArea>
    <ProjectDetails {...params} />
  </SafeArea>
);

export default ProjectDetailsScreen;
